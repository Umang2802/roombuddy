import * as React from "react";
import backgroundimg from "../../Assets/background.svg";
import Backgroundbuilding from "../../Assets/buildingsbck.svg";
import FeatItems from "../../Components/FeaturedItems/FeaturedItems.jsx";
import Navbar from "../../Components/Navbar/Navbar";
import Findroommate from "../../Assets/Findroommates.png";
import houseicon from "../../Assets/houseicon.png";
import chaticon from "../../Assets/chaticon.png";
import recomendationicon from "../../Assets/recomendationicon.png";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";
const Home = () => {

  return (
    <div>
      <Navbar></Navbar>
      <img className="background" src={backgroundimg} alt="" />
      <section className="mainsection">
        <div className="content1">
          <h1>ROOMBUDDY</h1>
          <h2>Find rooms and roommates at the tip of your fingers! </h2>
          <button>Get Started</button>
        </div>
        <img className="backgroundbuilding" src={Backgroundbuilding} alt="" />
      </section>
      <section className="featuredrooms">
        <h1 className="heading1">FEATURED LOCATIONS</h1>
        <div className="locations">
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
          <FeatItems image={backgroundimg}></FeatItems>
        </div>
      </section>
      <section className="roommate">
        <h1 className="heading1">FIND ROOMMATES</h1>
        <div className="contentgrid">
          <div className="writtencontent">
            <h2>Find the perfect match</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              optio animi laboriosam nobis voluptas iusto assumenda id, eos
              fugiat similique.
            </p>
            <button>Find Roommates</button>
          </div>
          <div className="roommateimage">
            <img src={Findroommate} alt="" />
          </div>
        </div>
      </section>
      <section className="whyus">
        <h1 className="heading1">WHY US?</h1>
        <div className="whyusgrid">
          <div className="price">
            <img src={houseicon} alt="" />
            <h4>Price Prediction</h4>
            <p>
              We give you an accurate prediction of house rent prices of your
              selected area.so that the next time you bargain you are confident!
            </p>
          </div>
          <div className="smart">
            <img src={recomendationicon} alt="" />
            <h4>Smart Recommendation</h4>
            <p>
              We give you an accurate prediction of house rent prices of your
              selected area.so that the next time you bargain you are confident!
            </p>
          </div>
          <div className="chat">
            <img src={chaticon} alt="" />
            <h4>Secure chat</h4>
            <p>
              We give you an accurate prediction of house rent prices of your
              selected area.so that the next time you bargain you are confident!
            </p>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Home;
