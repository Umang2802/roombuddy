import React, { useEffect, useState } from "react";
import Roomcard from "../Components/Roomcard/Roomcard.jsx";
import Navbar from "../Components/Navbar/Navbar.js";
import { Grid } from "@material-ui/core";
//import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../State/Actions/getroomAction";
// import { deletePost } from "../Services/index.js";
import RoomAppbar from "../Components/Appbar/RoomAppbar.jsx";
import { Backdrop, Box, CircularProgress } from "@mui/material";
const Roompage = () => {
  const dispatch = useDispatch();
  // const [roomsdata, setRoomsdata] = useState([]);
  // const roomsdetails = async () => {
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

  const [loading, setLoading] = React.useState(true);

  const roommdata = useSelector((state) => state.roomdata.rooms);

  const userId = JSON.parse(localStorage.getItem("user_id"));

  //const userdata = useSelector((state) => state.auth.user_id);

  useEffect(() => {
    if (roommdata.length !== 0) {
      setLoading(false);
    }
  }, [roommdata]);
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
  //       //console.log(res.data);
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
  //       //console.log(res.data);
  //     });

  //     console.log("working");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const [searchField, setSearchField] = useState("");

  const filteredrooms = roommdata.filter((room) => {
    return room.address.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };
  return (
    <>
      <Navbar />
      <RoomAppbar handleChange={handleChange} />

      <Box>
        <Grid justifyContent="center" container spacing={4}>
          {filteredrooms?.map((item, key) => {
            return (
              <>
                {userId !== item?.user._id && (
                  <Grid key={key} item xs={0}>
                    <Roomcard props={item}></Roomcard>
                  </Grid>
                )}
              </>
            );
          })}
        </Grid>
      </Box>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* <button onClick={deletepost}>Delete</button>
      <button onClick={updatepost}>Update</button> */}
    </>
  );
};
export default Roompage;
