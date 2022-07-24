import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { getSender } from "../../Config/config/ChatLogics";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../../Context/Provider";

const Allchats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, token, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post("/chat/fetch",{user}, config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user_id")));
    fetchChats();
  }, [fetchChats]);

  return (
    <Paper
      elevation={3}
      sx={{
        display: { xs: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "100%", md: "24%" },
        bgcolor: "white",
        p: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          pl: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom component="div">
          All messages
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#f2f2f2",
          height: "92%",
          width: "100%",
          p: "10px",
        }}
      >
        {chats ? (
          <Stack>
            {chats.map(
              (chat) =>
                chat.latestMessage && (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    sx={{
                      cursor: "pointer",
                      bgcolor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                      color: selectedChat === chat ? "white" : "black",
                      p: "6px",
                      mb: "7px",
                      borderRadius: "5px",
                    }}
                    key={chat._id}
                  >
                    <Typography>{getSender(loggedUser, chat.users)}</Typography>
                    {chat.latestMessage && (
                      <Typography sx={{ fontSize: 12 }}>
                        <b>{chat.latestMessage.sender.username} : </b>
                        {chat.latestMessage.content.length > 10
                          ? chat.latestMessage.content.substring(0, 10) + "..."
                          : chat.latestMessage.content}
                      </Typography>
                    )}
                  </Box>
                )
            )}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Paper>
    </Paper>
  );
};

export default Allchats;
