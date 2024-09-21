import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getBrandsNoPaninationAPI = async () => {
    const res = await axios.get(`${API_URLS}brands/no_pagination/`);
    return res;
  };