import React from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { height } from "@mui/system";
import background from "../../Assets/background.svg";
const Survey = () => {
  const [surveyResults, setSurveyResults] = useState([]);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState([]);
  const sendResponses = () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      console.log(user_id);
      const data1 = { user_id: user_id, response: formData };
      console.log(data1.response);

      axios
        .post("/survey", data1, config)
        .then((res) => {
          console.log("response", res);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const formQuestions = [
    "I start conversations",
    "I don't like to draw attention to myself",
    "I feel comfortable around people",
    "I am quiet around strangers",
    "I talk to a lot of different people",
    "I get stressed out easily",
    "I get irritated easily",
    "I am easily disturbed",
    "I often feel blue",
    "I change my mood a lot",
    "I take time out for others",
    "I feel others' emotions",
    "I am interested in people",
    "I make people feel at ease",
    "I have a soft heart",
    "I am always prepared",
    "I pay attention to details",
    "I like order",
    "I follow a schedule",
    "I make a mess of things",
    "I have difficulty understanding abstract ideas",
    "I have excellent ideas",
    "I am quick to understand things",
    "I spend time reflecting on things",
    "I have a rich vocabulary",
  ];

  const FormTitles = ["1", "2"];
  const PageDisplay = () => {
    return (
      <OtherInfo
        page={page}
        formQuestion={formQuestions[page]}
        formData={formData}
        setFormData={setFormData}
      />
    );
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <img
        style={{ position: "absolute", left: "0", right: "0" }}
        src={background}
        alt=""
      />
      {/* <Button onClick={handleClick}>TRY</Button>
      <Button onClick={sendResponses}>SUBMIT</Button>
      <Button onClick={personalitycheck}>CHECK</Button> */}
      <Container
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",

          marginTop: "25vh",
        }}
      >
        <div className="form">
          <div className="progressbar">
            <div
              style={{
                width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%",
              }}
            ></div>
          </div>
          <div className="form-container">
            <div className="header">{/* <h1>{FormTitles[page]}</h1> */}</div>
            <div className="body">{PageDisplay()}</div>
            <div className="footer">
              <Button
                disabled={page == 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </Button>
              <Button
                onClick={() => {
                  if (page === formQuestions.length - 1) {
                    sendResponses();
                    alert("Response Sent");
                  } else {
                    setPage((currPage) => currPage + 1);
                  }
                }}
              >
                {page === formQuestions.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Survey;
