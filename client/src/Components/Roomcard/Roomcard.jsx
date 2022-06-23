import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Backdrop, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PostChat from "../../Components/Chat/PostChat";
import { ChatState } from "../../Context/Provider";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Roomcard({ props }) {
  console.log(props);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { setSelectedChat, chats, setChats, user } = ChatState();

  const [showChat, setShowChat] = useState(false);

  const fetchChats = async () => {
    //console.log(user._id);
    const usertoken = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    console.log(chats);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log(data);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchChats();
  // }, [fetchChats]);
  // if (props.props?.images?.length > 0) {
  // }
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
      <Card sx={{ m: 3, maxWidth: 340, minHeight: 450 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={8}>
            {props?.images?.length > 0 && (
              <CardHeader
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
                borderRadius: ".1rem",
              }}
              variant="h7"
            >
              {props.rentPrice}
            </Typography>
          </Grid>
        </Grid>
        <Link style={{ textDecoration: "none" }} to={"/room/" + props._id}>
          {props?.images?.length > 0 && (
            <CardMedia
              component="img"
              height="194"
              image={props?.images[0].url}
              alt="Paella dish"
            />
          )}
          <CardContent>
            <Typography variant="h7" color="text.primary" fontWeight="bolder">
              {props?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props?.address}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Grid container align="center">
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  setShowChat(true);
                  accessChat("628273c939b9dd3b346ec13a");
                }}
                aria-label="add to favorites"
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton aria-label="share">
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
    </>
  );
}
