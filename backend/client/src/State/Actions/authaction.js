import { signUp } from "../../Services";
import { Login } from "../../Services";
export const signUpAction = (params, navigate) => (dispatch) => {
  signUp(params)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user_id", JSON.stringify(res.data.user._id));
      navigate("/");
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

export const LoginAction = (params, navigate) => (dispatch) => {
  Login(params)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user_id", JSON.stringify(res.data.user._id));

      navigate("/");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "LOGIN_FAILED",
        payload: err.response.data,
      });
    });
};
export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: "LOGOUT",
  });
  history.push("/");
};
