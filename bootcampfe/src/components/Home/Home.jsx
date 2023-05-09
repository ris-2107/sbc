import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { DiAws } from "react-icons/di";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import introVideo from "../../assets/videos/tekionIntro.mp4";

import { Link } from "react-router-dom";
import vg from "../../assets/images/bg.png";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { loading, error, message } = useSelector((state) => state.user);

  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height="100%"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={["16", "56"]}
        >
          <VStack
            width={"full"}
            alignItems={["center", "flex-end"]}
            spacing="4"
          >
            <Heading children="Security Bootcamp TEKION" size={"2xl"} />
            {user.isAuthenticated ==false && (
              <Text
                fontSize={"2xl"}
                fontFamily="cursive"
                textAlign={["center", "left"]}
                children="Please Login First !"
              />
            )}
            {user.isAuthenticated==false && (
            <Link to="/login">
              <Button size={"lg"} colorScheme="yellow">
                Login
              </Button>
            </Link>)}
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={"md"}
            src={vg}
            objectFit="contain"
          />
        </Stack>
      </div>

      <Box marginRight="2" marginLeft="2" padding={"8"} bg="blackAlpha.700">
        <Heading
          textAlign={"center"}
          fontFamily="body"
          color={"yellow.400"}
          children="Security Bootcamp"
        />
        <HStack
          className="brandsBanner"
          justifyContent={"space-evenly"}
          marginTop="4"
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          autoplay
          src={introVideo}
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
      </div>
    </section>
  );
};

export default Home;
