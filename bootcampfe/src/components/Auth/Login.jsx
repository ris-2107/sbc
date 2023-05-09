import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const submitHandler=(e)=>{
    e.preventDefault();
    navigate("/")
    dispatch(login(email,password))
  }
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children={'Welcome Security Bootcamp'} />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
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
            <FormLabel htmlFor="password" children={'Password'} />
            <Input
              required
              id="password"
              value={password}
              placeholder={'Enter Your Password'}
              type={'password'}
              focusBorderColor={'yellow.500'}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant="link">
                Forget Password ?
              </Button>
            </Link>
          </Box>
          <Button my={'4'} type="submit" colorScheme="yellow">
            Login
          </Button>
          <Box my={'4'}>
            New User ?{' '}
            <Link to="/register">
              <Button variant="link" colorScheme={'yellow'}>
                Sign Up
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
