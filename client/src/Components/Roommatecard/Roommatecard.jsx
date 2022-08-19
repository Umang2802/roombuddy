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
import { Backdrop } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PostChat from "../Chat/PostChat";
import { ChatState } from "../../Context/Provider";
import Grid from "@mui/material/Grid";
import ProfileModal from "../ProfileModal";

export default function Roommatecard({ props }) {
  console.log("props", props);
  const [open, setOpen] = React.useState(false);

  const { setSelectedChat, chats, setChats, user, token } = ChatState();

  const [showChat, setShowChat] = useState(false);

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
      console.log(error);
    }
  };
  const starredHandler = async () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (showChat) {
      setOpen(false);
    }
  }, [showChat]);

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
        console.log(error);
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
            <PostChat setShowChat={setShowChat} />
          </Backdrop>
        </div>
      ) : (
        <></>
      )}
      <Card
        sx={{ m: 3, width: 330, minHeight: 425, cursor: "pointer" }}
        onClick={() => setOpen(true)}
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
        {/* <Button onClick={()=>setOpen(true)}> */}
        {props?.image && (
          <CardMedia
            component="img"
            height="194"
            image={props?.image.url}
            alt="Paella dish"
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
            Budget : {"₹" + props?.budget}
          </Typography>
        </CardContent>
        {/* </Button> */}
        <CardActions>
          <Grid container mt={0} align="center">
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  setShowChat(true);
                  accessChat(props?.user);
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
      <ProfileModal item={props} setOpen={setOpen} open={open} />
    </>
  );
}
