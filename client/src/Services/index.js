import axios from "axios";

export const signUp = (params) => axios.post("/signup", params);
export const postRoom = (params, token) => axios.post("/rooms", params, token);
export const Login = (params) => axios.post("/login", params);
export const getallPosts = (params) => axios.get("/rooms", params);
