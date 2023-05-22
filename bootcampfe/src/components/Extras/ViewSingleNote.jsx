import {
  Button,
  Container,
  FormLabel,
  Grid,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import cursor from "../../assets/images/cursor.png";
import { server } from "../../redux/store";
// import Sidebar from '../Sidebar';
export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "purple",
  fontWeight: 600,
  backgroundColor: "#D8D8D8",
};
export const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const ViewSingleNote = () => {
  var noteid = useParams()["*"];
  const noteId = noteid.substring(noteid.lastIndexOf("/") + 1);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [sendTo, setSendTo] = useState();
  const [emailAllowed, setEmailAllowed] = useState("");
  const [emailToModify, setEmailToModify] = useState("");

  const getNoteData = async (id) => {
    console.log("Note Id: \t" + id);
    await axios
      .get(`http://3.95.66.123:4000/api/v1/getnotebyid/${id}`)
      .then((res) => {
        const noteData = res.data.data;
        console.log(res.data.data);
        setTitle(noteData.note_title);
        setDescription(noteData.note_description);
        setCreatedBy(noteData.note_creator);
        setEmailAllowed(noteData.emailsAllowed.join(", "));
      })
      .catch((e) => {
        console.log("Error: \t" + e);
      });
  };

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.user);

  const handleNotes = async (e) => {
    e.preventDefault();
    var loggedUser = localStorage.getItem("user");
    loggedUser = JSON.parse(loggedUser);
    console.log(loggedUser);
    const fdata = {
      userid: loggedUser._id,
      note_creator: loggedUser.normalize,
      emailallowed: emailAllowed,
      note_title: title,
      note_description: description,
    };
    await axios.post(
      `${server}createnote`,
      { datac: fdata },
      {
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    getNoteData(noteId);
  }, []);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Container py={"16"}>
        <form onSubmit={handleNotes}>
          <Heading
            textTransform={"uppercase"}
            children={"Edit Note Permission"}
            my={"16"}
            textAlign={["center", "left"]}
          />
          <VStack m={"auto"} spacing={"8"}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Title"}
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Description"}
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            <FormLabel>Creator Name</FormLabel>
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder={"Creator Name"}
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            <FormLabel>Emails Allowed</FormLabel>
            <Input
              value={emailAllowed}
              onChange={(e) => setEmailAllowed(e.target.value)}
              placeholder={"Emails Allowed"}
              type={"text"}
              readOnly={true}
              fontWeight={550}
              focusBorderColor={"purple.700"}
            />

            <FormLabel>Enter Email to Add/ Remove</FormLabel>
            <Input
              value={emailToModify}
              onChange={(e) => setEmailToModify(e.target.value)}
              type={"text"}
              placeholder="Enter the Email you want to have/remove access"
              fontWeight={350}
              focusBorderColor={"purple.700"}
            />

            <Button
              isLoading={loading}
              w={"full"}
              colorScheme={"purple"}
              type={"submit"}
            >
              {"Create "}
            </Button>
          </VStack>
        </form>
      </Container>
      {/* <Sidebar /> */}
    </Grid>
  );
};

export default ViewSingleNote;
