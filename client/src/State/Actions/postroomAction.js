import { postRoom } from "../../Services";
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
