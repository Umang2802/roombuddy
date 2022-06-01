import { Backdrop, Button} from "@mui/material";
import axios from "axios";
import { useEffect, useState} from "react";
import PostChat from "../Components/PostChat";
import { ChatState } from "../Context/ChatProvider";

const PostRoom = () => {
  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();

  const [showChat, setShowChat] = useState(false);

    const fetchChats = async () => {
      //console.log(user._id);
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

useEffect(() => {
  fetchChats();
}, [fetchChats])


  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setShowChat(true);
          accessChat("628273c939b9dd3b346ec13a");
        }}
      >
        Chat
      </Button>
      {showChat ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showChat}
          >
            <PostChat setShowChat={setShowChat}/>
          </Backdrop>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostRoom;
