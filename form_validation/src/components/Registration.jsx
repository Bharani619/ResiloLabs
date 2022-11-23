import React from "react";
import { Box, Button, Container, Text} from "@chakra-ui/react";
import { Form } from "./Form";
import {Link} from "react-router-dom";

export const Registration = () => {

  return (
    <>
      <Box>
        <Container mt={8} p={5}>
          <Text fontSize="2xl" m={5}>FORM VALIDATION</Text>
           <Form/>
        </Container>
      </Box>
    </>
  );
};
