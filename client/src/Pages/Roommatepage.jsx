import React, { useEffect, useState } from "react";
import Roomcard from "../Components/Roomcard/Roomcard.jsx";
import Navbar from "../Components/Navbar/Navbar.js";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../State/Actions/getroomAction";
import { deletePost } from "../Services/index.js";
import Appbar from "../Components/Appbar/Appbar.jsx";
import Roommatecard from "../Components/Roommatecard/Roommatecard";
const Roommatepage = () => {
  const dispatch = useDispatch();
  // const [roommatedata, setRoommatedata] = useState([]);
  // const roommatedetails = async () => {
  //   try {
  //     const usertoken = JSON.parse(localStorage.getItem("token"));
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${usertoken}`,
  //       },
  //     };
  //     axios
  //       .get("/rooms", config)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data) {
  //           setRoomsdata(res.data);
  //         }
  //         console.log(roomsdata);
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });

  //     console.log("working");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
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
  const roommatedata = useSelector((state) => state.roommatedata.rooms);
  const userdata = useSelector((state) => state.auth.user_id);
  console.log("room data", roommatedata);
  console.log("roomid ", userdata);
  // const deletepost = () => {
  //   const usertoken = JSON.parse(localStorage.getItem("token"));
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${usertoken}`,
  //     },
  //   };
  // const deletepost = async () => {
  //   try {
  //     const usertoken = JSON.parse(localStorage.getItem("token"));
  //     console.log(usertoken);
  //     const params = {
  //       roomId: roommdata[0]._id,
  //       userId: roommdata[0].user._id,
  //     };
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${usertoken}`,
  //       },
  //     };
  //     axios.post("/rooms/deleteRoom", params, config).then((res) => {
  //       console.log(res.data);
  //     });

  //     console.log("working");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const updatepost = async () => {
  //   try {
  //     const usertoken = JSON.parse(localStorage.getItem("token"));
  //     console.log(usertoken);
  //     const params = {
  //       ...roommdata,
  //       rentPrice: 3000,
  //       roomId: roommdata[0]._id,
  //       userId: roommdata[0].user._id,
  //     };
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${usertoken}`,
  //       },
  //     };
  //     axios.post("/rooms/updateRoom", params, config).then((res) => {
  //       console.log(res.data);
  //     });

  //     console.log("working");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <Navbar></Navbar>
      <Appbar props={"/roommateDetails"} />

      <Grid container spacing={0}>
        {roommatedata?.map((item, key) => (
          <Grid key={key} item xs={3}>
            <Roommatecard props={item}></Roommatecard>
          </Grid>
        ))}
      </Grid>
      {/* <button onClick={deletepost}>Delete</button>
      <button onClick={updatepost}>Update</button> */}
    </>
  );
};
export default Roommatepage;
