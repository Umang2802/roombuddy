import axios from "axios";

export const signUp = (params) => axios.post("/signup", params);
export const postRoom = (params, token) => axios.post("/rooms", params, token);
