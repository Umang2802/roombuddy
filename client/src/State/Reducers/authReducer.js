const initialState = {
  user_id: localStorage.getItem("user_id"),
  name: localStorage.getItem("name"),

  imageUrl: localStorage.getItem("imageUrl"),
  token: localStorage.getItem("token"),
};
const authReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("name", payload.name);
      localStorage.setItem("imageUrl", payload.imageUrl);
      localStorage.setItem("user_id", payload.user_id);
      return {
        ...state,
        token: payload.token,
        name: payload.name,
        imageUrl: payload.imageUrl,

        user_id: payload.user_id,
      };

    default:
      return state;
  }
};
export default authReducer;
