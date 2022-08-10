const initialState = {
  rooms: [],
};
const getallroomsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        rooms: payload,
      };

    default:
      return state;
  }
};

export default getallroomsReducer;
