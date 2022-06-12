const initialState = {
  user_id: localStorage.getItem("user_id"),
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  type: "",
  bio: "",
};
const authReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case "SIGNUP_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_id", payload._id);
      localStorage.setItem("username", payload.username);
      return {
        ...state,
        token: payload.token,
        username: payload.username,
        user_id: payload._id,
        type: payload.type,
        bio: payload.bio,
      };
    // case "SIGNUP_FAIL":
    //   return {
    //     ...state,
    //     errors: payload,
    //   };

    default:
      return state;
  }
};
export default authReducer;
