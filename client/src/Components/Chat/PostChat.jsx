import { Box, Button, Container } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./styles.css";
import { getSender } from "../../Config/config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import io from "socket.io-client";
import { ChatState } from "../../Context/Provider";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

const ENDPOINT = "https://roombuddyindia.herokuapp.com/"; // "https://roombuddy.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const PostChat = ({ setShowChat, fetchAgain, setFetchAgain}) => {
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
  const { selectedChat, user, notification, token, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/message",
          {
            sender: user,
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
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
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            bgcolor: "#90A9FC",
            height: "80vh",
            p: 2,
            borderRadius: "5px",
          }}
        >
          {selectedChat ? (
            <>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "black",
                }}
              >
                <Typography variant="h5" gutterBottom component="div">
                  {messages && <> {getSender(user, selectedChat.users)}</>}
                </Typography>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => setShowChat(false)}
                >
                  <CloseIcon />
                </Button>
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

                <Box onKeyPress={sendMessage} id="first-name" isRequired>
                  {istyping ? (
                    <div>
                      <Lottie
                        options={defaultOptions}
                        // height={50}
                        width={50}
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
            <></>
          )}
        </Box>
      </Container>
    </>
  );
};

export default PostChat;
