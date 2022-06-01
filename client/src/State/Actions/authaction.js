// import { loginService } from "../services";

// export const login = (params, history) => (dispatch) =>
//   loginService(params)
//     .then((res) => {
//       params.user_id = res.data.user_id;
//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: params,
//       });
//       history.push("/dashboard");
//     })
//     .catch((err) =>
//       dispatch({
//         type: "LOGIN_FAIL",
//         payload: err.response.data,
//       })
//     );
