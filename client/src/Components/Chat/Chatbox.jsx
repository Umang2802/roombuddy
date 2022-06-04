import React from "react";
import Paper from "@mui/material/Paper";
import Singlechat from "./Singlechat";
import { ChatState } from "../../Context/Provider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const {selectedChat } = ChatState();
  return (
    <Paper
      elevation={3}
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        alignItems: "center",
        flexDirection: "column",
        height: "75vh",
        width: { xs: "100%", md: "75%" },
        bgcolor: "white",
        p: 2,
      }}
    >
      <Singlechat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Paper>
  );
};

export default Chatbox;
