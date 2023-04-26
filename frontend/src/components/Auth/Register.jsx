import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { register } from '../../redux/actions/userActions';
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: 'black',
  fontWeight: 600,
  backgroundColor: '#D8D8D8',
};

export const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  
;
const dispatch= useDispatch()

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler =(e)=>{
    e.preventDefault();
    const myForm= new FormData();
    var ind=email.indexOf("@");
    var domain=email.slice(0,ind);
    if(domain != "bmsce.ac.in"){ 
      alert("Use BMSCE Mail ID");
      return null;}
    myForm.append("name",name)
    myForm.append("email",email)
    myForm.append("password",password)
    myForm.append("file",image)

    dispatch(register(myForm));
  }
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'14'}>
        <Heading textTransform={'uppercase'} children={'Registration'} />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>
          <Box>
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

          <Box>
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
          <Box>
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
            <FormLabel htmlFor="chooseAvatar" children={'Choose Avatar'} />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={'file'}
              focusBorderColor={'yellow.500'}
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button my={'4'} type="submit" colorScheme="yellow">
            Sign Up
          </Button>
          <Box>
            Already Signed Up ?{' '}
            <Link to="/login">
              <Button variant="link" colorScheme={'yellow'}>
                Login here
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
