import * as React from "react";
import axios from "axios";
const Modelpredict = () => {
  const clickedbtn = () => {
    const data = {
      location: "1st Block Jayanagar",
      total_sqft: 7.536897,
      bath: 1.098612,
      bhk: 1.386294,
    };
    axios.post("/model", data).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <button onClick={clickedbtn}>Click here</button>
    </>
  );
};
export default Modelpredict;
