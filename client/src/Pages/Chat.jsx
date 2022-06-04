import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chatbox from "../Components/Chat/Chatbox";
import Allchats from "../Components/Chat/Allchats";
import { ChatState } from "../Context/Provider";
import { useState } from "react";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            bgcolor: "#cfe8fc",
            height: "80vh",
            p: 2,
          }}
        >
          {user && <Allchats fetchAgain={fetchAgain} />}
          {user && 
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          }
        </Box>
      </Container>
    </div>
  );
};

export default Chat;
