import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Home from "./Pages/Home";
import ChatApp from "./Components/Chat/App";
import Signup from "./Pages/Signup";
import Roompage from "./Pages/Roompage";
import Postform from "./Pages/Postform";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatApp />} />
          <Route path="/roompage" element={<Roompage />} />
          <Route path="/postform" element={<Postform />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
