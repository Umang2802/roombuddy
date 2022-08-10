import { starredrooms } from "../../Services";

export const getstarredroomsAction = () => (dispatch) => {
  const usertoken = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
      "Content-type": "application/json",
    },
  };
  starredrooms(config).then((res) => {
    console.log(res.data);
    dispatch({
      type: "GET_STARRED_ROOMS",
      payload: res.data,
    });
  });
};
