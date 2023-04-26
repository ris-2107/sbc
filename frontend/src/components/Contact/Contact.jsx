import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'14'}>
        <Heading children={'Contact Us'} />
        <form style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children={'Name'} />
            <Input
              required
              id="name"
              value={name}
              placeholder={'Enter Your Name'}
              type={'text'}
              focusBorderColor={'yellow.500'}
              onChange={e => setName(e.target.value)}
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="email" children={'Email Address'} />
            <Input
              required
              id="email"
              value={email}
              placeholder={'Enter Your Email'}
              type={'email'}
              focusBorderColor={'yellow.500'}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="message" children={'Your Message'} />
            <Textarea
              required
              id="message"
              value={message}
              placeholder={'Enter Your Message ...'}
              focusBorderColor={'yellow.500'}
              onChange={e => setMessage(e.target.value)}
            />
          </Box>

          <Button my={'4'} type="submit" colorScheme="yellow">
            Send Mail
          </Button>
          <Box my={'4'}>
            Requesting for A Course ?{' '}
            <Link to="/request">
              <Button variant="link" colorScheme={'yellow'}>
                Request here
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
