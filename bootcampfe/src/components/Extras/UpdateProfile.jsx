import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { server } from "../../redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfileNew } from "../../redux/actions/userActions";
import { fileUploadStyle } from "./ProfilePage";
import { m } from "framer-motion";
const axiosInstance = axios.create({
  withCredentials: true,
});

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    handleUpdateText(e);
    handlePic(e);
  };

  const handleUpdateText = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    const verifiedReq =
      localStorage.getItem("isUserLoggedIn") == "true" ? true : false;
    myForm.append("verifiedReq", verifiedReq);
    console.log(JSON.parse(localStorage.getItem("user")));
    var Decuser = JSON.parse(localStorage.getItem("user"));
    myForm.append("userId", Decuser._id);
    console.log("Dowb");
    console.log(myForm);
    const dataSent = {
      name: name,
      email: email,
      verifiedReq: verifiedReq,
      userId: Decuser._id,
    };
    dispatch(updateProfileNew(dataSent));
  };
  const handlePic = async (e) => {
    
    e.preventDefault();
    var Decuser = JSON.parse(localStorage.getItem("user"));
    const myForm = new FormData();
    myForm.append("userid",  Decuser._id);
    myForm.append("file", image);
    const formData = {
      userid:Decuser._id,
      file: image,
    };

    const { data } = await axios.post(`${server}updateprofilepictureui`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    
  };

  const getLocal = () => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  };
  useEffect(() => {
    getLocal();
  }, []);

  return (
    <Container py={"16"} h={"90vh"}>
      <form>
        <Heading
          children={"Update profile"}
          my={"16"}
          ml={"140"}
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Box my={"4"} display={"flex"} justifyContent={"center"}>
            <Avatar
              src={imagePrev == "" ? userData?.avatar?.url : imagePrev}
              size={"2xl"}
            />
          </Box>
          <Input
            required
            id="name"
            value={name}
            placeholder={"Name"}
            type={"text"}
            focusBorderColor={"yellow.400"}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            id="email"
            value={email}
            placeholder={"Enter Your Email"}
            type={"email"}
            focusBorderColor={"yellow.500"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box>
            <FormLabel htmlFor="chooseAvatar" children={"Choose Avatar"} />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={"file"}
              focusBorderColor={"yellow.500"}
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button
            onClick={handleUpdate}
            type={"submit"}
            w={"full"}
            colorScheme={"yellow"}
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
