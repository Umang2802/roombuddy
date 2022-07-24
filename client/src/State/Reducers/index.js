import { combineReducers } from "redux";
import { getstarredroommateAction } from "../Actions/getstarredroommateAction";
import authReducer from "./authReducer";
import getallroommatesReducer from "./getallroommatesReducer";
import getallroomsReducer from "./getallroomsReducer";
import getstarredroommatesReducer from "./getstarredroommatesReducer";
import getstarredroomsReducer from "./getstarredroomsReducer";
export default combineReducers({
  auth: authReducer,
  roomdata: getallroomsReducer,
  roommatedata: getallroommatesReducer,
  starredroommates: getstarredroommatesReducer,
  starredrooms: getstarredroomsReducer,
});
