import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container h={'90vh'}>
      <VStack h={'full'} spacing={'4'} justifyContent={'center'}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading my={'8'} textAlign={'center'}>
          Page Not found !
        </Heading>
        <Link to="/">
          <Button variant={'ghost'}>Go To Home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
