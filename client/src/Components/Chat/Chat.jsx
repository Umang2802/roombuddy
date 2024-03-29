import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chatbox from "./Chatbox";
import Allchats from "./Allchats";
import { useState } from "react";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const user = JSON.parse(localStorage.getItem("user_id"));

  return (
    <div>
      <Container maxWidth="lg" sx={{ position: { md: "initial", sm: "none" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            bgcolor: "#90A9FC",
            height: "80vh",
            width: { md: "70vw", sm: "70vw" },
            p: 2,
          }}
        >
          {user && <Allchats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Chat;
