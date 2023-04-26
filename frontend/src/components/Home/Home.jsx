import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { DiAws } from 'react-icons/di';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import introVideo from '../../assets/videos/PlatformIntro.mp4';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import vg from '../../assets/images/bg.png';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const user= useSelector(state=>state.user)

  const {loading,error,message}= useSelector(state=>state.user)

  useEffect(() => {
    // const{isUserLoggedIn}=localStorage.getItem(isUserLoggedIn);
    // const{userLogInTime}=localStorage.getItem(userLogInTime);
    console.table(user);
  }, [])

  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing="4"
          >
            <Heading children="Learn from the BMS COMMUNITY" size={'2xl'} />
            <Text
              fontSize={'2xl'}
              fontFamily="cursive"
              textAlign={['center', 'left']}
              children="Find Valuable Content at reasonable prices"
            />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit="contain"
          />
        </Stack>
      </div>

      <Box marginRight="2" marginLeft="2" padding={'8'} bg="blackAlpha.700">
        <Heading
          textAlign={'center'}
          fontFamily="body"
          color={'yellow.400'}
          children="BMSEdu"
        />
        <HStack
          className="brandsBanner"
          justifyContent={'space-evenly'}
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
          src={introVideo}
          //autoPlay
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
