import { getallRoommates } from "../../Services";

export const getroommateAction = () => (dispatch) => {
  const usertoken = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
      "Content-type": "application/json",
    },
  };
  getallRoommates(config).then((res) => {
    console.log(res.data);
    dispatch({
      type: "GET_ALL_ROOMMATEPOSTS",
      payload: res.data,
    });
  });
};
