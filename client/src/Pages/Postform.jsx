import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import { Typography } from "@mui/material";
const Postform = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Typography>Post details</Typography>
        <Typography>Enter all the post details</Typography>
      </Container>
    </>
  );
};

export default Postform;
