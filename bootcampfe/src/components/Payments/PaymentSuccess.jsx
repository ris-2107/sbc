import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container h={'90vh'} p={'14'}>
      <Heading my={'8'} textAlign={'center'}>
        PRO Pack !
      </Heading>
      <VStack
        boxShadow={'lg'}
        pb={'16'}
        alignItems={'center'}
        borderRadius={'lg'}
      >
        <Box
          w={'full'}
          bg={'yellow.400'}
          p={'4'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text color={'black'} children={'Payment Success'} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} spacing={'8'} px={'8'} mt={'4'}>
            <Text>
              Congratulations on becoming a PRO member, You now have access to
              All Premium Content
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button variant={'ghost'}>Go To Profile</Button>
        </Link>
        <Heading size={'xs'}>Reference: ee0-iuj9Jier/hyyt6</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
