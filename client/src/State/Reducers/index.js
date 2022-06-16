import { combineReducers } from "redux";
import authReducer from "./authReducer";
import getallroomsReducer from "./getallroomsReducer";
export default combineReducers({
  auth: authReducer,
  roomdata: getallroomsReducer,
});
