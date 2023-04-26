import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const CourseModel = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addlectureHandler,
  courseTitle,
  lectures = [],
}) => {
  //const courseTitle = 'React Course';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState();
  return (
    <Modal isOpen={isOpen} size={'full'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={'16'}>
          <Grid templateColumn={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading>{courseTitle}</Heading>
                <Heading size={'sm'} opacity={0.4}>
                  #{id}
                </Heading>
              </Box>
              <Heading children={'Lectures'} size={'lg'} />
              {lectures.map(item => (
                <VideoCard
                  title={title}
                  description={description}
                 // num={num}
                  lectureId={'lectureId'}
                  courseId={'courseId'}
                  deleteButtonHandler={deleteButtonHandler} 
                  addLectureHandler={addlectureHandler}    
                  />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addlectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children={'Add Lecture'}
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeHolder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeHolder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CourseModel;


function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107, 70,193.0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button>
        <RiDeleteBin7Fill
          color={'purple.600'}
          onClick={() => deleteButtonHandler(courseId, lectureId)}
        />
      </Button>
    </Stack>
  );
}