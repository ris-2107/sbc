import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import coFounderImg from '../../assets/images/download.jpg';
import introVideo from '../../assets/videos/tekionIntro.mp4';
import data from '../../assets/docs/termsAndCondition.js';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '14']} padding={'8'}>
    <VStack>
      <Avatar src={coFounderImg} boxSize={['40', '48']} />
      <Text children={'SecurityBootcamp'} opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={['center', 'flex-start']}>
      <Heading children={'GARIMA KAUR AND AKANKSHA'} size={['md', 'xl']} />
      <Text
        children={
          'Hi We are the Back End and Front End Developers of this web app.'
        }
        opacity={'0.7'}
      />
    </VStack>
  </Stack>
);

const TNC = () => {
  return (
    <Box>
      <Heading
        size={'md'}
        children={'Terms & Conditions'}
        textAlign={['center', 'left']}
        my={'4'}
      />

      <Box h={'sm'} p={'4'} overflowY={'scroll'}>
        <Text
          fontFamily={'heading'}
          textAlign={['center', 'left']}
          letterSpacing={'widest'}
        >
          {data}
        </Text>
        <Heading
          my={'4'}
          size={'xs'}
          children={'Refund only applicable for cancellations within 7 days!'}
        />
      </Box>
    </Box>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        src={introVideo}
        autoPlay
        loop
        muted
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      />
    </Box>
  );
};

const About = () => {
  return (
    <Container maxW={'container.lg'} padding="14" boxShadow={'lg'}>
      <Heading children={'About Us'} textAlign={['center', 'left']} />
      <Founder />
      <Stack m={'8'} direction={['column', 'row']} alignItems="center">
        <Text fontFamily={'cursive'} m="7" textAlign={['center', 'left']}>
          Hi, Welcome to Security Bootcamp! We are glad that you visited.
          Security Bootcamp is a community driven platform where BMS studeents,teacher and other staff members can
          can post educational content videos about any topic and help their
          peers! This platform also has some premium content that can be
          accessed only via a premium account.
        </Text>
        <Link to="/subscribe">
          <Button variant="ghost" colorScheme={'yellow'}>
            Checkout Our Plans
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TNC />
      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          textTransform={'uppercase'}
          children={'The payment is 100% secured by Razorpay'}
        />
      </HStack>
    </Container>
  );
};

export default About;
