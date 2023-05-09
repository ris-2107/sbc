import {
  Button,
  Container,
  Grid,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import cursor from "../../assets/images/cursor.png";
import { createCourse } from "../../redux/actions/adminActions";
import axios from "axios";
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

const CreateUserNote = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [sendTo, setSendTo] = useState();
  const [emailAllowed, setEmailAllowed] = useState("");

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
    await axios.post(`${server}createnote`, {datac:fdata}, {
      withCredentials: true,
    });
  };



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.error(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

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
            children={"Create Note"}
            my={"16"}
            textAlign={["center", "left"]}
          />
          <VStack m={"auto"} spacing={"8"}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Title"}
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Description"}
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder={"Creator Name"}
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            <Input
              value={emailAllowed}
              onChange={(e) => setEmailAllowed(e.target.value)}
              placeholder={"Allow Permission Email"}
              type={"text"}
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

export default CreateUserNote;
