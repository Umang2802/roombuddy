import { postRoom } from "../../Services";
import { postroommate } from "../../Services";
export const postRoomAction = (params) => (dispatch) => {
  const usertoken = JSON.parse(localStorage.getItem("token"));
  console.log(usertoken);
  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
      "Content-type": "application/json",
    },
  };
  postRoom(params, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: "POSTROOM",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "POSTROOMFAIL",
        payload: err.response.data,
      })
    );
};

export const postRoommateAction = (params) => (dispatch) => {
  const usertoken = JSON.parse(localStorage.getItem("token"));
  console.log(usertoken);
  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
      "Content-type": "application/json",
    },
  };
  postroommate(params, config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: "POSTROOMMATE",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "POSTROOMMATEFAIL",
        payload: err.response.data,
      })
    );
};
