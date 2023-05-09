import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiLink,
  TiSocialInstagramCircular,
  TiSocialYoutubeCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children={'All Rights Reserved'} color={'white'} />
          <Heading
            size={'sm'}
            fontFamily={'body'}
            children={'@SecurityBootcamp'}
            color={'yellow.500'}
          />
        </VStack>
        <HStack
          color={'white'}
          fontSize={'50'}
          spacing={['2', '10']}
          justifyContent={'center'}
        >
          <a
            rel={'noreferrer'}
            target={'blank'}
            href="https://SecurityBootcamp.ac.in/"
          >
            <TiLink/>
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
