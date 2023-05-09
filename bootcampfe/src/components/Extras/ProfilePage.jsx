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

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);
    const formData = {
      name,
      email,
      password,
      file: image,
    };

    console.log(formData);
    dispatch(register(formData));
  };

  const getLocal = () => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    
  };
  useEffect(() => {
    getLocal();
  }, []);
  

  return (
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={"14"}>
        <Heading textTransform={"uppercase"} children={"Your Profile"} />

        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Box my={"4"} display={"flex"} justifyContent={"center"}>
            <Avatar src={userData?.avatar?.url} size={"2xl"} />
          </Box>
          <Box>
            <FormLabel htmlFor="name" children={"Name"} />
            <Text style={{marginLeft:"2rem"}}
              fontSize={"md"}
              textAlign={["center", "left"]}
              children={userData?.name}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="email" children={"Email Address"} />
            <Text
            style={{marginLeft:"2rem"}}
              fontSize={"md"}
              textAlign={["center", "left"]}
              children={userData?.email}
            />
          </Box>
          {/* <Button my={"4"} type="submit" colorScheme="yellow">
            Sign Up
          </Button> */}
          {/* <Box>
            Already Signed Up ?{" "}
            <Link to="/login">
              <Button variant="link" colorScheme={"yellow"}>
                Login here
              </Button>
            </Link>
          </Box> */}
        </form>
      </VStack>
    </Container>
  );
};

export default ProfilePage;
