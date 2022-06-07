import axios from "axios";

export const signUp = (params) => axios.post("/signup", params);
