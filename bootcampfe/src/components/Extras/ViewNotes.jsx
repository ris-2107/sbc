import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions";
import axios from "axios";
export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "black",
  fontWeight: 600,
  backgroundColor: "#D8D8D8",
};

export const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const ViewNotes = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();
  // const changeImageHandler = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImagePrev(reader.result);
  //     setImage(file);
  //   };
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const myForm = new FormData();

  //   myForm.append("name", name);
  //   myForm.append("email", email);
  //   myForm.append("password", password);
  //   myForm.append("file", image);
  //   const formData = {
  //     name,
  //     email,
  //     password,
  //     file: image,
  //   };

  //   console.log(formData);
  //   dispatch(register(formData));
  // };

  const getLocal = async () => {
    const d = await axios.get("http://localhost:4000/api/v1/getnotes").data;
    setData(d);
    setUserData(JSON.parse(localStorage.getItem("user")));
  };
  useEffect(() => {
    getLocal();
  }, []);

  return (
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={"14"}>
        <Heading textTransform={"uppercase"} children={" Notes"} />
        {/* {data.map((item) => (
          <Text>{item.note_creator}</Text>
        ))} */}
      </VStack>
    </Container>
  );
};

export default ViewNotes;
