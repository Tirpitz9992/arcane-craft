import { Box, Text } from "@chakra-ui/react";
import React from "react";

const About: React.FC = () => {
  return (
    <Box id="about" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">个人介绍内容...</Text>
    </Box>
  );
};

export default About;