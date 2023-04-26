import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import CourseModel from './CourseModel';

const AdminCourses = () => {
  const courses = [
    {
      _id: '907ian7890o9kjil00oiuu0u',
      poster: {
        url: 'https://cdn.pixabay.com/photo/2023/01/13/21/55/scented-candles-7716967__340.jpg',
      },
      title: 'Gatsby.Js',
      category: 'Web Development',
      createdBy: 'Rishabh Sinha',
      views: 126,
      numOfVideos: 16,
    },
  ];
  const { isOpen, onClose, onOpen } = useDisclosure();

  const courseDetailsHandler = userId => {
    onOpen();
  };
  const deleteButtonHandler = userId => {
    console.log(userId);
  };
  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.table(courseId, lectureId);
  };
  const addlectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children={'All Users'}
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption> All Available Courses in the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric={true}> Views</Th>
                <Th isNumeric={true}> Lectures</Th>
                <Th isNumeric={true}> Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  courseDetailsHandler={courseDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          id="ghjdf67hjksdf78"
          couseTitle="React Course"
          onClose={onClose}
          deleteButtonHandler={deleteLectureButtonHandler}
          addlectureHandler={addlectureHandler}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td fontWeight={600} fontSize={'sm'}>
        #{item._id}
      </Td>
      <Td>
        <Image borderRadius={'5'} src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric={true}>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;