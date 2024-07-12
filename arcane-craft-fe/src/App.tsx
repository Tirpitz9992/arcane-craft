import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import React from "react";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Home />
      <About />
    </ChakraProvider>
  );
}

export default App;