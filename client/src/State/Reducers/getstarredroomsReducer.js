const initialState = {
  starredrooms: [],
};
const getstarredroomsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_STARRED_ROOMS":
      return {
        ...state,
        starredrooms: payload.posts,
      };

    default:
      return state;
  }
};

export default getstarredroomsReducer;
