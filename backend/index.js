if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const User = require("./models/user");

const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/userRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");

const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://parth25:Comp2570@roombuddy.j50dr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongo Connection open !");
  })
  .catch((err) => {
    console.log("Oh no Mongo error");
  });

app.use("/", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/userprofiles", userProfileRoutes);

app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);


const server = app.listen(5000, () => {
  console.log("Serving on port 5000");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

