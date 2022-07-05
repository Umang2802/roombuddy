import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar/Navbar";
import Roomcard from "../Components/Roomcard/Roomcard";
import { useSelector } from "react-redux";
import DashboardRoomcard from "../Components/DashboardRoomcard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardRoommatecard from "../Components/DashboardRoommatecard";
import * as actionCreator from "../State/Actions/getroomAction";
import * as actionCreator2 from "../State/Actions/getroommateAction";
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
  const roomsdata = useSelector((state) => state.roomdata.rooms);
  const profiledata = useSelector((state) => state.roommatedata.roommates);
  const userdata = useSelector((state) => state.auth.user_id);
  const filteredroomdata = roomsdata.filter((rooms) => {
    if (rooms.user._id === userdata) {
      return rooms;
    }
  });

  const filteredroomatedata = profiledata.filter((profile) => {
    if (profile.user === userdata) {
      return profile;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(actionCreator.getroomAction());
    dispatch(actionCreator2.getroommateAction());
    // try {
    //   const usertoken = JSON.parse(localStorage.getItem("token"));
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${usertoken}`,
    //     },
    //   };

    //   axios.post("/favoriteposts/userFavoritePosts", config).then((res) => {
    //     console.log("fav", res.data);
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="My posts" {...a11yProps(0)} />
          <Tab label="Chats" {...a11yProps(1)} />
          <Tab label="Starred" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography>Posted Rooms</Typography>
          {filteredroomdata.map((filteredRoom) => (
            <DashboardRoomcard props={filteredRoom}></DashboardRoomcard>
          ))}
          <Typography>Posted profile</Typography>
          {filteredroomatedata.map((roomatedata) => (
            <DashboardRoommatecard props={roomatedata}></DashboardRoommatecard>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}