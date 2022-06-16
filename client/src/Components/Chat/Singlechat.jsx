import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./styles.css";
import { getSender } from "../../Config/config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../Animations/typing.json";
import io from "socket.io-client";
import { ChatState } from "../../Context/Provider";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container, IconButton } from "@mui/material";

const ENDPOINT = "http://localhost:5000"; // "https://roombuddy.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const Singlechat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {}
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");

        console.log(selectedChat);
        console.log(newMessage);
        console.log(user.token);
        console.log(config);

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {}
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Container
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between" },

              fontSize: { xs: "25px", md: "30px" },
              p: "0px",
              pb: "10px",
            }}
          >
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                px: "12px",
                py: 0,
                color: "black",
                bgcolor: "#cfe8fc",
                borderRadius: "5px",
              }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              sx={{
                flexGrow: 1,
                alignItems: "center",
                fontSize: { xs: "25px", md: "30px" },
                pl: 2,
              }}
            >
              {messages && <> {getSender(user, selectedChat.users)}</>}
            </Typography>
          </Container>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#e7e7e7",
              height: "92%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              borderRadius: "5px",
              overflowY: "hidden",
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{
                  alignSelf: "center",
                  margin: "auto",
                }}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Box onKeyDown={sendMessage} id="first-name" isRequired>
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <TextField
                fullWidth
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                sx={{
                  bgcolor: "#E0E0E0",
                }}
                autoFocus
                margin="dense"
              />
            </Box>
          </Paper>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>Click on a user to start chatting</Typography>
        </Box>
      )}
    </>
  );
};

export default Singlechat;
