import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Homepage/Home";
import Signup from "./Pages/Signup";
import Roompage from "./Pages/Roompage";
import Postform from "./Pages/Postform";
import ChatApp from "./Pages/Chat";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import PostRoom from "./Pages/PostRoom";
import RoomDetailsForm from "./Pages/RoomDetailsForm";
import SingleRoom from "./Pages/SingleRoom";
import ProfileDetailsForm from "./Pages/ProfileDetailsForm";
import { Provider } from "react-redux";
import store from "./State/store";
import RoomDetails from "./Pages/RoomDetails";
import Roommatepage from "./Pages/Roommatepage";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/logout" element={<Logout />} exact />
          <Route path="/chats" element={<ChatApp />} />
          <Route path="/roomDetailsForm" element={<RoomDetailsForm />} />
          <Route path="/roomDetails" element={<RoomDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room" element={<Roompage />} />
          <Route path="/roomchat" element={<PostRoom />} />
          <Route path="/postform" element={<Postform />} />
          <Route path="/room/:id" element={<SingleRoom />} exact />
          <Route
            path="/profileDetailsForm"
            element={<ProfileDetailsForm />}
            exact
          />
          <Route path="/roommates" element={<Roommatepage />} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
