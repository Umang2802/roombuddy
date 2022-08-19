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
import { Backdrop, Box, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import PostChat from "../../Components/Chat/PostChat";
import { ChatState } from "../../Context/Provider";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Roomcard({ props }) {
  const { setSelectedChat, chats, setChats, fetchAgain, setFetchAgain } =
    ChatState();

      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

  const user = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [showChat, setShowChat] = useState(false);

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
        roomId: props._id,
      };
      console.log(params);
      axios
        .post("/favoriteposts/addOrRemoveFavoritePost", params, config)
        .then((res) => {
          console.log(res.data);
        });
      setSuccessMessage("Added to Starred in Dashboard");
      setOpenSuccess(true);
    } catch (e) {
      console.log(e.message);
      setErrorMessage(e.message);
      setOpenError(true);
    }
  };

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
      <Card sx={{ mt: 3, width: 330, minHeight: 425 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={8}>
            {props?.images?.length > 0 && (
              <CardHeader
                sx={{ p: 1.3 }}
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={props?.images[0].url}
                    aria-label="recipe"
                  ></Avatar>
                }
                title={props?.user.username}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                bgcolor: "#6177D4",
                color: "white",
                padding: ".5rem 1rem",
                borderRadius: ".5rem",
              }}
              variant="h7"
            >
              {props.rentPrice}
            </Typography>
          </Grid>
        </Grid>
        {user === null || user === undefined ? (
          <Box onClick={()=> {setErrorMessage("You need to Login first"); setOpenError(true);}}>
            {props?.images?.length > 0 && (
              <CardMedia
                component="img"
                height="194"
                image={props?.images[0].url}
                alt="Paella dish"
              />
            )}
            <CardContent sx={{ paddingBottom: "0 !important" }}>
              <Typography variant="h7" color="text.primary" fontWeight="bolder">
                {props?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props?.address.length > 40
                  ? props.address.substring(0, 40) + "...."
                  : props.address}
              </Typography>
              <Typography
                mt={1}
                variant="body2"
                color="gray"
                fontWeight={"bold"}
              >
                {props?.propertyType}
              </Typography>
            </CardContent>
          </Box>
        ) : (
          <Link style={{ textDecoration: "none" }} to={"/room/" + props._id}>
            {props?.images?.length > 0 && (
              <CardMedia
                component="img"
                height="194"
                image={props?.images[0].url}
                alt="Paella dish"
              />
            )}
            <CardContent sx={{ paddingBottom: "0 !important" }}>
              <Typography variant="h7" color="text.primary" fontWeight="bolder">
                {props?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props?.address.length > 40
                  ? props.address.substring(0, 40) + "...."
                  : props.address}
              </Typography>
              <Typography
                mt={1}
                variant="body2"
                color="gray"
                fontWeight={"bold"}
              >
                {props?.propertyType}
              </Typography>
            </CardContent>
          </Link>
        )}
        <CardActions>
          <Grid container align="center">
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  if (user) {
                    setShowChat(true);
                    accessChat(props?.user._id);
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
