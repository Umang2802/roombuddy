import React from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import Box from "@mui/material/Box";

const Survey = () => {
  const [surveyResults, setSurveyResults] = useState([]);

  const populateValue = () => {
    // for (let i = 0; i < 25; i++) {
    //   data.push(Math.floor(Math.random() * 5 + 1));
    // }
    const data = [
      3, 4, 1, 2, 3, 4, 3, 1, 6, 3, 3, 2, 3, 1, 3, 4, 5, 2, 2, 3, 1, 5, 4, 1, 3,
    ];
    setSurveyResults(data);
  };

  const handleClick = () => {
    populateValue();
    console.log(surveyResults);
  };
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
      const data1 = { user_id: user_id, response: surveyResults };

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
  const personalitycheck = () => {
    try {
      const usertoken = JSON.parse(localStorage.getItem("token"));
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      };
      console.log(user_id);
      const data2 = {
        roommateIDs: ["630010f697259a744cfb4271", "62fe95d373a52c57e8f545a2"],
        response: surveyResults,
      };

      axios
        .post("/personality", data2, config)
        .then((res) => {
          let data = res.data.reverse();
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
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState([]);
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
    <>
      <Button onClick={handleClick}>TRY</Button>
      <Button onClick={sendResponses}>SUBMIT</Button>
      <Button onClick={personalitycheck}>CHECK</Button>
      <Box
        sx={{ display: "grid", justifyContent: "center", alignItems: "center" }}
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
              <button
                disabled={page == 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
              <button
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
              </button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Survey;
