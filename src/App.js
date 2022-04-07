import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Home from "./Pages/Home"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
      <Home />
    </div>
  );
};

export default App;
