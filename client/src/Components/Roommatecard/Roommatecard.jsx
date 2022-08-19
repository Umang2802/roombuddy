import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Backdrop, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PostChat from "../Chat/PostChat";
import { ChatState } from "../../Context/Provider";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import ProfileModal from "../ProfileModal";

export default function Roommatecard({ props }) {
  console.log("props", props);
  const [open, setOpen] = React.useState(false);

  const { setSelectedChat, chats, setChats, fetchAgain, setFetchAgain } = ChatState();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const user = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [star, setStar] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const [showChat, setShowChat] = useState(false);

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };

  const accessChat = async (userId) => {
    console.log(chats);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/chat/access`,
        { user, userId },
        config
      );
      console.log(data);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
    } catch (error) {
      setErrorMessage("Failed to Load chat Box");
      setOpenError(true);
    }
  };
  const starredHandler = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      if (usertoken === null || usertoken === undefined) {
        throw new Error("You need to Login first");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      const params = {
        roommateId: props._id,
      };
      console.log(params);
      axios
        .post(
          "/starredRoommates/addOrRemoveStarredRoommateProfile",
          params,
          config
        )
        .then((res) => {
          console.log(res.data);
        });
      setSuccessMessage("Added to Starred in Dashboard");
      setOpenSuccess(true);
    } catch (e) {
      setErrorMessage(e.message);
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (token === null || token === undefined) {
      if (open) {
        setOpen(false);
        console.log("hello");
      }
    }
    if (showChat) {
      setOpen(false);
    }
    if (star) {
      setOpen(false);
      setStar(false);
    }
  }, [showChat, star, token, open]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post("/chat/fetch", { user }, config);
        setChats(data);
      } catch (error) {
        setErrorMessage("Failed to fetch chats");
        setOpenError(true);
      }
    };
    fetchChats();
  }, [setChats, token, user]);

  return (
    <>
      {showChat ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showChat}
          >
            <PostChat
              setShowChat={setShowChat}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </Backdrop>
        </div>
      ) : (
        <></>
      )}
      <Card
        sx={{ m: 3, width: 330, minHeight: 425, cursor: "pointer" }}
        onClick={() => {
          if (token === null || token === undefined) {
            setErrorMessage("You need to Login first");
            setOpenError(true);
          } else {
            setOpen(true);
          }
        }}
      >
        <Grid item xs={8}>
          {props?.image && (
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  src={props?.image.url}
                  aria-label="recipe"
                ></Avatar>
              }
              title={props?.name}
            />
          )}
        </Grid>
        {props?.image && (
          <CardMedia
            component="img"
            height="194"
            image={props?.image.url}
            alt="Room"
            loading="lazy"
          />
        )}
        <CardContent sx={{ padding: "16px 16px 0px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Typography variant="h7" color="text.primary" fontWeight="bolder">
              Age: {props?.age}
            </Typography>
            <Typography variant="h7" color="text.primary" fontWeight="Bolder">
              Gender: {props?.gender}
            </Typography>
          </div>
          <Typography mt={1} variant="body2" color="text.secondary">
            <strong>Occupation: </strong>
            {props?.occupation}
          </Typography>
          <Typography mt={1} variant="body2" color="text.secondary">
            <strong>Looking in:</strong> {props?.lookingForRoomIn}
          </Typography>
          {/* <Typography mt={1} variant="body2" color="text.secondary">
              <strong>Looking from :</strong> {props?.lookingToMoveIn}
            </Typography> */}
          <Typography
            mt={1}
            variant="body1"
            color="#6177D4"
            fontWeight="Bolder"
          >
            Budget : {props?.budget}
          </Typography>
        </CardContent>
        {/* </Button> */}
        <CardActions>
          <Grid container mt={0} align="center">
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  if (user) {
                    setShowChat(true);
                    accessChat(props?.user);
                  } else {
                    setErrorMessage("You need to Login first");
                    setOpenError(true);
                  }
                }}
                aria-label="add to favorites"
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                aria-label="share"
                onClick={() => {
                  setStar(true);
                  starredHandler();
                }}
              >
                <StarBorderOutlinedIcon size="small" />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton aria-label="location">
                <LocationOnOutlinedIcon size="small" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <ProfileModal item={props} setOpen={setOpen} open={open} />
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
