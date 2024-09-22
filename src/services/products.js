import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllProductsAPI = async (page, searchValue) => {
  const res = await axios.get(
    `${API_URLS}products/?page=${page}${
      searchValue ? "&search=" + searchValue : ""
    }`
  );
  return res;
};

export const createProductAPI = async (data) => {
  const res = await axios.post(`${API_URLS}products/`, data);
  return res;
};
export const delteSingleProductAPI = async (id) => {
  const res = await axios.delete(`${API_URLS}products/${id}/`);
  return res;
};

export const deleteProducts = async (data) => {
  const res = await axios.post(
    `${API_URLS}products/delete_many_products/`,
    data
  );
  return res;
};
export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API_URLS}products/${id}/`, data);
  return res;
};

export const getDetailProductAPI = async (id) => {
  const res = await axios.get(`${API_URLS}products/${id}/`);
  return res;
};

export const getProductByCatId = async (id) => {
  const res = await axios.get(
    `${API_URLS}products/?all=true&product_category__public_id=${id}`,
  );
  return res;
};
