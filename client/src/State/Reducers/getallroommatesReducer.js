const initialState = {
  roommates: [],
};
const getallroommatesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_ALL_ROOMMATEPOSTS":
      return {
        ...state,
        roommates: payload,
      };

    default:
      return state;
  }
};

export default getallroommatesReducer;
