import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar/Navbar";
import Roomcard from "../Components/Roomcard/Roomcard";
import Roommatecard from "../Components/Roommatecard/Roommatecard";
import { useSelector } from "react-redux";
import DashboardRoomcard from "../Components/DashboardRoomcard";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardRoommatecard from "../Components/DashboardRoommatecard";
import * as actionCreator from "../State/Actions/getroomAction";
import * as actionCreator2 from "../State/Actions/getroommateAction";
import * as actionCreator3 from "../State/Actions/getstarredroommateAction";
import * as actionCreator4 from "../State/Actions/getstarredroomsAction";
import profileimage from "../Assets/profileicon.png";
import { Grid } from "@mui/material";

import Chat from "../Components/Chat/Chat";
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const [starredroommate, setStarredroommate] = useState([]);
  const roomsdata = useSelector((state) => state.roomdata.rooms);
  const profiledata = useSelector((state) => state.roommatedata.roommates);
  console.log(roomsdata);
  const starredroommatesdata = useSelector(
    (state) => state.starredroommates.starredroommates
  );
  const starredroomsdata = useSelector(
    (state) => state.starredrooms.starredrooms
  );

  const filterstarred = (arr1, arr2) => {
    let res = [];
    res = arr2.filter((element) => {
      return arr1.find((el) => {
        return el === element._id;
      });
    });
    return res;
  };
  const starredroommates = filterstarred(starredroommatesdata, profiledata);
  const starredrooms = filterstarred(starredroomsdata, roomsdata);
  console.log("strd", starredrooms);
  const userdata = useSelector((state) => state.auth);

  const filteredroomdata = roomsdata.filter((rooms) => {
    if (rooms.user._id === userdata.user_id) {
      return rooms;
    }
  });

  const filteredroomatedata = profiledata.filter((profile) => {
    if (profile.user === userdata.user_id) {
      return profile;
    }
  });

  const loadStarreddata = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };

      await axios
        .get("/starredRoommates/userStarredRoommateProfiles", config)
        .then((res) => {
          console.log("api", res.data);
          setStarredroommate(res.data.roomatees);

          return res.data.roommates;
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(actionCreator.getroomAction());
    dispatch(actionCreator2.getroommateAction());
    dispatch(actionCreator3.getstarredroommateAction());
    dispatch(actionCreator4.getstarredroomsAction());

    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };

      axios.get("/favoriteposts/userFavoritePosts", config).then((res) => {});
    } catch (e) {
      console.log(e);
    }

    // eslint-disable-next-line
  }, [starredroommate]);
  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ height: "20vh", backgroundColor: "#E1E7FF" }}></Box>
      <Box sx={{ textAlign: "center", marginTop: "-15vh" }}>
        <Grid container>
          <Grid item sm={12}>
            <img
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "50%",
              }}
              src={profileimage}
              // src={profileimage.length>0:profileimage?''}
              alt=""
            />
            <Typography
              sx={{
                fontFamily: "Poppins",

                fontWeight: "800",
                fontSize: "1.7rem",
              }}
            >
              {userdata.username}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",

                fontWeight: "medium",
                fontSize: ".9rem",
              }}
            >
              {userdata.bio}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "grid",
          width: "100vw",
          justifyContent: "center",
        }}
      >
        <Tabs
          orientation="horizontal"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderColor: "divider",
            display: "grid",
            justifyContent: "center",
            mb: 3,
            mt: 3,
          }}
        >
          <Tab
            sx={{ textTransform: "none" }}
            label="My posts"
            {...a11yProps(0)}
          />
          <Tab sx={{ textTransform: "none" }} label="Chats" {...a11yProps(1)} />
          <Tab
            sx={{ textTransform: "none" }}
            label="Starred"
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={10}>
            <Grid item sm={12} md={6}>
              <Typography>Posted Rooms</Typography>
              {filteredroomdata.map((filteredRoom) => (
                <DashboardRoomcard props={filteredRoom}></DashboardRoomcard>
              ))}
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography>Posted profile</Typography>
              {filteredroomatedata.map((roomatedata) => (
                <DashboardRoommatecard
                  props={roomatedata}
                ></DashboardRoommatecard>
              ))}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Chat />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Posted Rooms</Typography>
          <Grid container spacing={6}>
            {starredrooms?.map((item, key) => (
              <Grid key={key} item>
                <Roomcard props={item}></Roomcard>
              </Grid>
            ))}
          </Grid>
          <Typography>Posted Rooms</Typography>
          <Grid container spacing={0}>
            {starredroommates?.map((item, key) => (
              <Grid key={key} item>
                <Roommatecard props={item}></Roommatecard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
}
