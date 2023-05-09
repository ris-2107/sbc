import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../redux/actions/courseActions";
import toast from "react-hot-toast";

export const Course = ({
  id,
  views,
  title,
  imgSrc,
  addToPlayListHandler,
  creator,
  description,
  lectureCount,
}) => {
  const isAuthenticatedUser = useSelector(
    (state) => state.user.isAuthenticated
  );
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image src={imgSrc} boxSize="60" objectFit={"contain"} />
      <Heading
        textAlign={["center", "left"]}
        maxW={"200px"}
        size={"sm"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text children={description} noOfLines={2} />

      <HStack>
        <Text
          children={"Creator"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
        />
        <Text
          children={creator}
          fontFamily={"body"}
          textTransform={"uppercase"}
        />
      </HStack>

      {/*<Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures : ${lectureCount}`}
        textTransform={'uppercase'}
        />*/}

      <Heading
        size={"xs"}
        children={`Viewed By : ${views} users`}
        textTransform={"uppercase"}
      />
      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          {isAuthenticatedUser && (
            <Button colorScheme={"yellow"}>Watch Now</Button>
          )}
        </Link>
        {/* <Button
          onClick={addToPlayListHandler(id)}
          variant={'ghost'}
          colorScheme={'yellow'}
        >
          Add To Playlist
        </Button> */}
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const addToPlayListHandler = (courseId) => {
    console.log("addToPlayListHandler executed", courseId);
  };
  const dispatch = useDispatch();
  const [keyword, setKeyWord] = useState("");
  const [category, setCategory] = useState("");

  const { loading, courses, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearError" });
    }
  }, [category, keyword, dispatch, error]);

  const categories = [
    "Web development",
    "Big Data",
    "Data Science",
    "App Development",
    "Data Structure And Algorithms",
    "Game Development",
  ];
  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
      <Heading children="All Courses" m={"8"} />
      <Input
        value={keyword}
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder={"Search for a Course"}
        type={"text"}
        focusBorderColor={"yellow.500"}
      />

      <HStack
        overflowX={"auto"}
        paddingY={"7"}
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={["column", "row"]}
        flexWrap="Wrap"
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        {courses.length > 0 ? (
          courses.map((item) => (
            <Course
              key={item._id}
              id={item._id}
              views={item.views}
              title={item.title}
              imgSrc={item.poster.url}
              addToPlayListHandler={addToPlayListHandler}
              creator={item.createdBy}
              description={item.description}
              lectureCount={item.numOfVideos}
            />
          ))
        ) : (
          <Heading>Not Found</Heading>
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
