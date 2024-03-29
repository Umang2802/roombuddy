import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import * as actionCreator from "../State/Actions/getroommateAction";
// import { deletePost } from "../Services/index.js";
import RoommateAppbar from "../Components/Appbar/RoommateAppbar.jsx";
import Roommatecard from "../Components/Roommatecard/Roommatecard";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
const Roommatepage = () => {
  const dispatch = useDispatch();
  const [showrooms, setShowrooms] = useState([]);
  const [setcost, setSetcost] = useState([]);
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
    dispatch(actionCreator.getroommateAction());
    // eslint-disable-next-line
  }, []);
  const [loading, setLoading] = React.useState(true);
  //setLoading(true);
  const roommatedata = useSelector((state) => state.roommatedata.roommates);

  useEffect(() => {
    if (roommatedata.length !== 0) {
      setLoading(false);
    }
  }, [roommatedata]);
  useEffect(() => {
    setShowrooms(roommatedata);
  }, []);

  const userdata = useSelector((state) => state.auth.user_id);
  const response = useSelector((state) => state.auth.response);

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

  const [searchField, setSearchField] = useState("");

  let filteredRoommates = roommatedata.filter((roommate) => {
    return roommate.lookingForRoomIn
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  const userId = JSON.parse(localStorage.getItem("user_id"));

  const handleChange = (e) => {
    setSearchField(e.target.value);
    setShowrooms(filteredRoommates);
  };

  const personalitycheck = () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };

      console.log(response);

      const data2 = {
        roommateIDs: ["62fe95d373a52c57e8f545a2", "630010f697259a744cfb4271"],
        response: response,
      };
      axios
        .post("/personality", data2, config)
        .then((res) => {
          console.log("response", res.data);
          let data3 = res.data.map((item) => {
            return item.Roommateprofile;
          });
          setShowrooms(data3);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <RoommateAppbar
        handleChange={handleChange}
        personalitycheck={personalitycheck}
      />

      <Grid container spacing={0}>
        {showrooms?.map((item, key) => {
          return (
            <>
              {userId !== item?.user && (
                <Grid key={key} item xs={3}>
                  <Roommatecard props={item}></Roommatecard>
                </Grid>
              )}
            </>
          );
        })}
      </Grid>
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
export default Roommatepage;
