import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignIn from "./Pages/Login";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Home></Home>
      </Router>
    </div>
  );
};

export default App;
