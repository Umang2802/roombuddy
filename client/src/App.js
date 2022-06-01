import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Roompage from "./Pages/Roompage";
import Postform from "./Pages/Postform";
import ChatApp from "./Pages/Chat";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import PostRoom from "./Pages/PostRoom";
import RoomDetailsForm from "./Pages/RoomDetailsForm";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/logout" element={<Logout />} exact />
        <Route path="/chats" element={<ChatApp />} />
        <Route path="/room" element={<PostRoom />} />
        <Route path="/roomDetailsForm" element={<RoomDetailsForm />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/roompage" element={<Roompage />} />
          <Route path="/postform" element={<Postform />} />
      </Routes>
    </div>
  )}

export default App;
