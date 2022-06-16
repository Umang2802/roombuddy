import React, { useEffect, useState } from "react";
import Roomcard from "../Components/Roomcard/Roomcard.jsx";
import Navbar from "../Components/Navbar/Navbar.js";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../State/Actions/getroomAction";
const Roompage = () => {
  const dispatch = useDispatch();
  const [roomsdata, setRoomsdata] = useState([]);
  const roomsdetails = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      axios
        .get("/rooms", config)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setRoomsdata(res.data);
          }
          console.log(roomsdata);
        })
        .catch((err) => {
          console.log("Error", err);
        });

      console.log("working");
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   roomsdetails();
  // }, []);

  // useEffect(() => {
  //   console.log("in second useeffect", roomsdata);
  // }, [roomsdata]);
  useEffect(() => {
    dispatch(actionCreator.getroomAction());
    // eslint-disable-next-line
  }, []);
  const roommdata = useSelector((state) => state.roomdata.rooms);
  console.log("room data", roommdata);

  return (
    <>
      <Navbar></Navbar>
      <Grid container>
        {roommdata?.map((item, key) => (
          <Grid key={key} item xs={4}>
            <Roomcard props={item}></Roomcard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Roompage;
