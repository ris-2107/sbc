import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ViewNotes = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [yourNotes, setYourNotes] = useState([]);
  const dispatch = useDispatch();

  const handleBoxClick = async (noteId) => {
    console.log("UserId: \t" + userData["_id"]);
    console.log(noteId);
    navigate(`/view-single-note/${noteId}`);
  };

  const getNotesData = async () => {
    try {
      const response = await axios.get(
        "http://3.95.66.123:4000/api/v1/getnotes"
      );
      setData(response.data.data);
      setUserData(JSON.parse(localStorage.getItem("user")));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getNotesData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const matchedNotes = data.filter(
        (item) => item.note_creator_id === userData["_id"]
      );
      setYourNotes(matchedNotes);
    }
  }, [data]);

  return (
    <Box
      h="100vh"
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container pt={10} mt={6} maxW="container.md" display="flex">
        <VStack spacing={6} align="stretch" w="70%" pr={6}>
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            textTransform="uppercase"
          >
            Notes
          </Heading>
          <Box overflowY="auto" flex="1">
            {data.map((note) => (
              <Box
                key={note._id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                backgroundColor="gray.100"
                boxShadow="lg"
                mb={4}
              >
                <Heading as="h4" size="md" mb={2}>
                  {note.note_title}
                </Heading>
                <Text color="gray.600" fontSize="sm" mb={2}>
                  {note.note_description}
                </Text>
                <HStack spacing={4}>
                  <Text fontSize="sm">Creator: {note.note_creator}</Text>
                  <Text fontSize="sm">
                    Allowed Emails: {note.emailsAllowed.join(", ")}
                  </Text>
                </HStack>
              </Box>
            ))}
          </Box>
        </VStack>
        <Box w="30%" overflowY="auto">
          <Heading
            as="h2"
            size="md"
            textAlign="center"
            textTransform="uppercase"
            mt={6}
          >
            Your Notes
          </Heading>
          {yourNotes.map((note) => (
            <Box
              key={note._id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              backgroundColor="gray.100"
              boxShadow="lg"
              mb={4}
              mt={4}
              onClick={() => handleBoxClick(note._id)}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.6 }}
            >
              <Heading as="h4" size="md" mb={2}>
                {note.note_title}
              </Heading>
              <Text color="gray.600" fontSize="sm" mb={2}>
                {note.note_description}
              </Text>
              <HStack spacing={4}>
                <Text fontSize="sm">Creator: {note.note_creator}</Text>
                <Text fontSize="sm">
                  Allowed Emails: {note.emailsAllowed.join(", ")}
                </Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ViewNotes;
