import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
      <Home />
      <Footer />
    </div>
  );
};

export default App;
