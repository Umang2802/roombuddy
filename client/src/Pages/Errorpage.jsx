import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'

export default function Errorpage() {
  return (
    <>
      <Navbar />
      <div
        style={{ marginLeft: "240px", padding: "30px", fontSize: "x-large", minHeight: "44vh" }}
      >
        Error 404! Page not Found
      </div>
      <Footer/>
    </>
  );
}
