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
import { Grid, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import Chat from "../Components/Chat/Chat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user_id"));

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null || user === undefined) {
      setErrorMessage("you need to Login first");
      setOpenError(true);
      navigate("/");
    }
  }, [navigate,user])
  

  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  //const [starredroommate, setStarredroommate] = useState([]);
  // const [Newusername, setNewusername] = useState();
  // const [Newuserbio, setNewuserbio] = useState();
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
    if (rooms.user._id === user) {
    return rooms;
    }
    else{
        return null;
    }
  });

  const filteredroomatedata = profiledata.filter((profile) => {
    if (profile.user === user) {
      return profile;
    }
    else{
        return null;
    }
    
  });

  // const loadStarreddata = async () => {
  //   try {
  //     const usertoken = JSON.parse(localStorage.getItem("token"));
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${usertoken}`,
  //       },
  //     };

  //     await axios
  //       .get("/starredRoommates/userStarredRoommateProfiles", config)
  //       .then((res) => {
  //         console.log("api", res.data);
  //         setStarredroommate(res.data.roomatees);

  //         return res.data.roommates;
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
  }, []);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ height: "20vh", backgroundColor: "#E1E7FF" }}>
        <div>
          <Button onClick={handleClickOpen}>Edit profile</Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Edit Profile
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </Box>
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
            <Grid item xs={12} sm={6}>
              <Typography>Posted Rooms</Typography>
              {filteredroomdata.map((filteredRoom) => (
                <DashboardRoomcard props={filteredRoom}></DashboardRoomcard>
              ))}
            </Grid>
            <Grid item xs={12} sm={6}>
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
          <Typography>
            <b>Rooms</b>
          </Typography>
          <Grid container spacing={6}>
            {starredrooms?.map((item, key) => (
              <Grid key={key} item>
                <Roomcard props={item}></Roomcard>
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ mt: 3 }}>
            <b>Profiles</b>
          </Typography>
          <Grid container spacing={6}>
            {starredroommates?.map((item, key) => (
              <Grid key={key} item>
                <Roommatecard props={item}></Roommatecard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
