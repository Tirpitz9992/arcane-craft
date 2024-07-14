import { Box, Image, Text, Button } from "@chakra-ui/react";
import React from "react";

const Home: React.FC = () => {
  return (
    <Box
      id="home"
      height="100vh"
      backgroundImage="url('./public/bg.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      <Text fontSize="4xl" fontWeight="bold">I am I Soul Coaching</Text>
      <Text fontSize="2xl">Embracing your greatness never hurts anyone</Text>
    </Box>
  );
};

export default Home;