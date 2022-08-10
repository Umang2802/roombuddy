const initialState = {
  starredroommates: [],
};
const getstarredroommatesReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "GET_STARRED_ROOMMATES":
      return {
        ...state,
        starredroommates: payload.roommates,
      };

    default:
      return state;
  }
};

export default getstarredroommatesReducer;
