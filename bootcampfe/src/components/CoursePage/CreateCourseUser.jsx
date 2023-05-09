import {
    Button,
    Container,
    Grid,
    Heading,
    Image,
    Input,
    Select,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { toast } from 'react-hot-toast';
  import { useDispatch, useSelector } from 'react-redux';
  import cursor from '../../assets/images/cursor.png';
  import { createCourse } from '../../redux/actions/adminActions';
 // import Sidebar from '../Sidebar';
  export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: 'purple',
    fontWeight: 600,
    backgroundColor: '#D8D8D8',
  };
  export const fileUploadStyle = {
    '&::file-selector-button': fileUploadCss,
  };
  
  const CreateCourseUser = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [createdBy, setCreatedBy] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    const [imagePrev, setImagePrev] = useState();
  
     const dispatch = useDispatch();
     const loggedInUser=useSelector(state=>state.user);
     const {loading,error,message}= useSelector(state=>state.user)
  
  
    const categories = [
      'Web development',
      'Big Data',
      'Data Science',
      'App Development',
      'Data Structure And Algorithms',
      'Game Development',
    ];
    const changeImageHandler = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
    };
    const changeVideoHandler = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        //setVideo(reader.result);
        setVideo(file);
      };
    };
  
    const submitHandler=(e)=>{
      e.preventDefault();
  
      const myForm= new FormData();
  
      myForm.append("title",title)
      myForm.append("description",description)
      myForm.append("category",category)
      myForm.append("createdBy",createdBy)
      myForm.append("file",image)
      
  
      dispatch(createCourse(title,description,category,createdBy,image));
    }
  
    useEffect (() => {

      if(error){
        toast.error(error);
        dispatch({type:'clearError'})
      }
      if(message){
        toast.error(message);
        dispatch({type:'clearMessage'})
      }
      
    }, [dispatch,error,message])
    
    return (
      <Grid
        css={{
          cursor: `url(${cursor}), default`,
        }}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        <Container py={'16'}>
          <form onSubmit={submitHandler}>
            <Heading
              textTransform={'uppercase'}
              children={'Create Course'}
              my={'16'}
              textAlign={['center', 'left']}
            />
            <VStack m={'auto'} spacing={'8'}>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={'Title'}
                type={'text'}
                focusBorderColor={'purple.300'}
              />
              <Input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={'Description'}
                type={'text'}
                focusBorderColor={'purple.300'}
              />
              <Input
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
                placeholder={'Creator Name'}
                type={'text'}
                
                focusBorderColor={'purple.300'}
              />
              <Select
                focusBorderColor={'purple.400'}
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value=""> Category</option>
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Text fontWeight={"500"} margintop={4} color={"inherit"} children={`Add Course Thumbnail`} />
              <Input
                accept="image/*"
                //displayName={'Enter thumbnail'}
                required
                type={'file'}
                focusBorderColor={'purple.400'}
                css={fileUploadStyle}
                onChange={changeImageHandler}
              />
               
  
              {imagePrev && (
                <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
              )}
              <Text fontWeight={"500"} margintop={4} color={"inherit"} children={`Add video file`} />
               <Input
                accept="*/*"
                required
                type={'file'}
                focusBorderColor={'purple.300'}
                css={fileUploadStyle}
                onChange={changeVideoHandler}
              />
              <Button isLoading={loading} w={'full'} colorScheme={'purple'} type={'submit'}>
                {'Create '}
              </Button>
            </VStack>
          </form>
        </Container>
        {/* <Sidebar /> */}
      </Grid>
    );
  };
  
  export default CreateCourseUser;
  