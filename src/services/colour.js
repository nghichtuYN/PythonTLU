import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllColourNoPaninationAPI = async () => {
  const res = await axios.get(`${API_URLS}colour/?all=true`);
  return res;
};
