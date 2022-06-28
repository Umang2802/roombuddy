import { combineReducers } from "redux";
import authReducer from "./authReducer";
import getallroommatesReducer from "./getallroommatesReducer";
import getallroomsReducer from "./getallroomsReducer";
export default combineReducers({
  auth: authReducer,
  roomdata: getallroomsReducer,
  roommatedata: getallroommatesReducer,
});
