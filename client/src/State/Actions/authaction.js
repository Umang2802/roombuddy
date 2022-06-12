import { signUp } from "../../Services";
export const signUpAction = (params) => (dispatch) => {
  signUp(params)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res));
      console.log(res.data);
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "SIGNUP_FAIL",
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
