import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Subscribe = () => {
  return (
    <Container h="90vh" p={'14'}>
      <Heading children={'Welcome'} m={'8'} textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text
            fontWeight={'600'}
            color={'black'}
            children={`Pro Pack: ₹399`}
          />
        </Box>

        <Box textAlign={'center'} px={'8'} mt={'4'} spacing="8">
          <VStack>
            <Text
              mt={'4px'}
              pt={'3px'}
              // color={'black'}
              children={`Get the Pro Pack and get access to all courses on the Platform`}
            />
            <Heading pb={'4px'} size={'md'} children={'₹399 Only'} />
          </VStack>
          <Button colorScheme={'yellow'} w="full" mt="5" mb={'4'} py={'2px'}>
            Buy Now
          </Button>
        </Box>
        <Box bg={'blackAlpha.600'} p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            pb={'4px'}
            size={'sm'}
            color={'white'}
            textTransform={'uppercase'}
            children={'100% refundable on cancellation'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children={'Terms and Conditions Apply'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
