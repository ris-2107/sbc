import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfileNew, verifyOtpAction } from "../../redux/actions/userActions";
const axiosInstance = axios.create({
  withCredentials: true,
});

const OtpPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault();
    const verifiedReq =
      localStorage.getItem("isUserLoggedIn") == "true" ? true : false;
    console.log(JSON.parse(localStorage.getItem("user")));
    var Decuser = JSON.parse(localStorage.getItem("user"));
    const dataSent = {
      otp: otp,
      email: email,
      verifiedReq: verifiedReq,
      userId: Decuser._id,
    };
    navigate('/home')
    dispatch(verifyOtpAction(dataSent));

  };
  return (
    <Container py={"16"} h={"90vh"}>
      <form>
        <Heading
          children={"Enter the OTP received on mail"}
          my={"16"}
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />
        <VStack spacing={"8"}>
          <Input
            required
            id="email"
            value={email}
            placeholder={"Enter Your Email"}
            type={"email"}
            focusBorderColor={"yellow.500"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            id="otp"
            value={otp}
            placeholder={"Enter OTP"}
            type={"text"}
            focusBorderColor={"yellow.400"}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            onClick={handleUpdate}
            type={"submit"}
            w={"full"}
            colorScheme={"yellow"}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default OtpPage;
