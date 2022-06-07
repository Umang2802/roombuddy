import { signUp } from "../../Services";
export const login = (params) => (dispatch) => {
  signUp(params)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response.data,
      })
    );
};

// export const logout = (history) => (dispatch) => {
//   localStorage.removeItem("admin_user_id");
//   dispatch({
//     type: "LOGOUT",
//   });
//   history.push("/admin");
// };
