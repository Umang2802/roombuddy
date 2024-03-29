const initialState = {
  user_id: localStorage.getItem("user_id"),
  token: localStorage.getItem("token"),
  username: "",
  error: null,
  imageURL: "",
  bio: "",
  type: "",
  response: [],
};

const authReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        token: payload.token,
        username: payload.user.username,
        user_id: payload.user._id,
        imageURL: payload.user.imageURL,
        bio: payload.user.bio,
        type: payload.user.type,
        response: payload.user.response,
        error: null,
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        error: payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: payload.token,
        username: payload.user.username,
        user_id: payload.user._id,
        imageURL: payload.user.imageURL,
        bio: payload.user.bio,
        type: payload.user.type,
        response: payload.user.response,
        error: null,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "LOGOUT":
      return {
        token: null,
        username: null,
        user_id: null,
        imageURL: null,
        bio: null,
        type: null,
        response: null,
        error: null,
      };

    default:
      return state;
  }
};
export default authReducer;
