import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllSizeOptions = async (id) => {
  const res = await axios.get(`${API_URLS}size_category/${id}/size_option/`);
  return res;
};
export const getAllSizeOptionsV2 = async (id) => {
  const res = await axios.get(`${API_URLS}size_category/${id}/size_option/?all=true`);
  return res;
};

export const deleteSizeOptions = async (data) => {
  const res = await axios.post(
    `${API_URLS}size_option/delete_many_size_options/`,
    data
  );
  return res;
};

export const addSizeOptionsBySizeCategory = async (data) => {
  const res = await axios.post(
    `${API_URLS}size_option/add_size_options_by_size_category/`,
    data
  );
  return res;
};

export const deleteSingleSizeOption = async (id) => {
  const res = await axios.delete(`${API_URLS}size_option/${id}/`);
  return res
};

