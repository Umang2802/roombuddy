import axios from "axios";

export const signUp = (params) => axios.post("/signup", params);
export const postRoom = (params, token) => axios.post("/rooms", params, token);
export const Login = (params) => axios.post("/login", params);
export const getallPosts = (params) => axios.get("/rooms", params);
export const postroommate = (params, token) =>
  axios.post("/roommateprofiles", params, token);
export const getallRoommates = (params) =>
  axios.get("/roommateprofiles", params);
// export const deletePost = (params) => axios.post("/deleteRoom", params);
export const deleteRoommateProfile = (params) =>
  axios.post("/roommateprofiles/deleteRoommateProfile", params);
export const updateRoommateProfile = (params) =>
  axios.post("roommateprofiles/updateRoommateProfile", params);
export const starredroommates = (params) =>
  axios.get("/starredRoommates/userStarredRoommateProfiles", params);
export const starredrooms = (params) =>
  axios.get("/favoriteposts/userFavoritePosts", params);
export const editUserProfile = (params) => {
  axios.get("");
};
