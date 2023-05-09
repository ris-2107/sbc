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
  const [emailsAllowed, setEmailsAllowed] = useState("");

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.user);
  const handleNotes = async () => {
    const fdata = {};
  };

  const categories = [
    "Web development",
    "Big Data",
    "Data Science",
    "App Development",
    "Data Structure And Algorithms",
    "Game Development",
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("sendto", sendTo);
    myForm.append("createdBy", createdBy);

    dispatch(createCourse(title, description, sendTo, createdBy));
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
        <form onSubmit={submitHandler}>
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
              value={emailsAllowed}
              onChange={(e) => setEmailsAllowed(e.target.value)}
              placeholder={"Allow Permission Email"}
              type={"text"}
              focusBorderColor={"purple.700"}
            />

            <Button
              isLoading={loading}
              w={"full"}
              colorScheme={"purple"}
              type={"submit"}
              onClick={handleNotes}
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
