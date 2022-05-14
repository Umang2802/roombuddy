const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join", (roomName) => {
    let split = roomName.split("--with--"); // ['username2', 'username1']

    let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']

    let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

    Array.from(socket.rooms)
      .filter((it) => it !== socket.id)
      .forEach((id) => {
        socket.leave(id);
        socket.removeAllListeners("send_message");
      });
    
      console.log(updatedRoomName);
    socket.join(updatedRoomName);

    socket.on("send_message", (message) => {
      Array.from(socket.rooms)
        .filter((it) => it !== socket.id)
        .forEach((id) => {
          socket.to(id).emit("receive_message", message);
        });
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " ==== diconnected");
    socket.removeAllListeners();
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
