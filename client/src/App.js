import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Homepage/Home";
import Signup from "./Pages/Signup";
import Roompage from "./Pages/Roompage";
import Login from "./Pages/Login";
import RoomDetailsForm from "./Pages/RoomDetailsForm";
import SingleRoom from "./Pages/SingleRoom";
import ProfileDetailsForm from "./Pages/ProfileDetailsForm";
import { Provider } from "react-redux";
import store from "./State/store";
import Roommatepage from "./Pages/Roommatepage";
import Dashboard from "./Pages/Dashboard";
import Errorpage from "./Pages/Errorpage";
import Modelpredict from "./Pages/Modelpredict";
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/roomDetailsForm" element={<RoomDetailsForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room" element={<Roompage />} />
          <Route path="/room/:id" element={<SingleRoom />} exact />
          <Route
            path="/profileDetailsForm"
            element={<ProfileDetailsForm />}
            exact
          />
          <Route path="/roommates" element={<Roommatepage />} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="*" element={<Errorpage />} />
          <Route path="/modelpredict" element={<Modelpredict />}></Route>
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
