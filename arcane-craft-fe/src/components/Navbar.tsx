import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex maxW="1200px" mx="auto" justifyContent="space-between">
        <NextLink href="/" passHref>
          <Link color="white" fontWeight="bold">Home</Link>
        </NextLink>
        <NextLink href="/about" passHref>
          <Link color="white" fontWeight="bold">About</Link>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Navbar;