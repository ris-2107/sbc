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

const Request = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'14'}>
        <Heading children={'Request A New Course'} />
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
            <FormLabel htmlFor="message" children={'Course'} />
            <Textarea
              required
              id="course"
              value={course}
              focusBorderColor={'yellow.500'}
              placeholder={'Explain the Course Requirements'}
              onChange={e => setCourse(e.target.value)}
            />
          </Box>

          <Button my={'4'} type="submit" colorScheme="yellow">
            Send Request
          </Button>
          <Box my={'4'}>
            See Available Courses!{' '}
            <Link to="/courses">
              <Button variant="link" colorScheme={'yellow'}>
                here
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
