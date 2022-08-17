import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar.js";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../State/Actions/getroommateAction";
// import { deletePost } from "../Services/index.js";
import RoommateAppbar from "../Components/Appbar/RoommateAppbar.jsx";
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
    dispatch(actionCreator.getroommateAction());
    // eslint-disable-next-line
  }, []);
  const roommatedata = useSelector((state) => state.roommatedata.roommates);
  const userdata = useSelector((state) => state.auth.user_id);
  console.log("roommate data", roommatedata);
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

  const [searchField, setSearchField] = useState("");

  const filteredRoommates = roommatedata.filter((roommate) => {
    return roommate.lookingForRoomIn.toLowerCase().includes(searchField.toLowerCase());
  });
  
  const userId = JSON.parse(localStorage.getItem("user_id"));

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      <Navbar></Navbar>
      <RoommateAppbar handleChange={handleChange} />

      <Grid container spacing={0}>
        {filteredRoommates?.map((item, key) => {
          return (
            <>
              {userId !== item?.user._id && (
                <Grid key={key} item xs={3}>
                  <Roommatecard props={item}></Roommatecard>
                </Grid>
              )}
            </>
          );
        })}
      </Grid>
      {/* <button onClick={deletepost}>Delete</button>
      <button onClick={updatepost}>Update</button> */}
    </>
  );
};
export default Roommatepage;
