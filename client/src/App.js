import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Home from "./Pages/Home";
import ChatApp from "./Pages/Chat";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import PostRoom from "./Pages/PostRoom";
import RoomDetailsForm from "./Pages/RoomDetailsForm";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/logout" element={<Logout />} exact />
        <Route path="/profile" element={<Login />} />
        <Route path="/dashboard" element={<Login />} />
        <Route path="/chats" element={<ChatApp />} />
        <Route path="/room" element={<PostRoom />} />
        <Route path="/roomDetailsForm" element={<RoomDetailsForm />} />
      </Routes>
    </div>
  );
};

export default App;
