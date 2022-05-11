import "./style.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const user = "umang";
  const anotherUser = "ummang";

  const joinRoom = () => {
    if (username !== "") {
        // Connected, let's sign-up for to receive messages for this room
        socket.emit("join", `${user}--with--${anotherUser}`);
      setShowChat(true);
    }
  };

  return (
    <div className="chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={`${user}--with--${anotherUser}`} />
      )}
    </div>
  );
}

export default App;
