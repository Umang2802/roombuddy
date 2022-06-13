import React from "react";
import Roomcard from "../Components/Roomcard/Roomcard.jsx";
import Navbar from "../Components/Navbar/Navbar.js";
import { Grid } from "@material-ui/core";
const Roompage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Grid container>
        <Grid item xs={4}>
          <Roomcard></Roomcard>
        </Grid>
        <Grid item xs={4}>
          <Roomcard></Roomcard>
        </Grid>
      </Grid>
    </>
  );
};
export default Roompage;
