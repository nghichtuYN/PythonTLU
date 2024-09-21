import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const axiosJWT=axios.create()
export const register = async (data) => {
  const res = await axios.post(`${API_URLS}auth/register/`, data);
  return res;
};
export const login = async (data) => {
  const res = await axios.post(`${API_URLS}auth/login/`, data);
  return res;
};
export const getDetail = async (id, access_token) => {
  const res = await axiosJWT.get(`${API_URLS}user/${id}/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const googleLogin = async (data) => {
  const res = await axios.post(`${API_URLS}auth/google/`, data);
  return res;
};
export const refreshToken=async(refresh_token)=>{
  const res=await axios.post(`${API_URLS}auth/refresh/`,{refresh:refresh_token})
  return res.data
}