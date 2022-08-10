import { starredroommates } from "../../Services";

export const getstarredroommateAction = () => (dispatch) => {
  const usertoken = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
      "Content-type": "application/json",
    },
  };
  starredroommates(config).then((res) => {
    console.log(res.data);
    dispatch({
      type: "GET_STARRED_ROOMMATES",
      payload: res.data,
    });
  });
};
