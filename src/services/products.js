import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllProductsAPI = async (page) => {
  const res = await axios.get(`${API_URLS}products/?page=${page}`);
  return res;
};

export const getProductsBySearchAPI = async (searchValue, page) => {
  const res = await axios.get(
    `${API_URLS}products/?page=${page}&search=${encodeURIComponent(
      searchValue
    )}`
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

export const getProductByCatId = async (data) => {
  const res = await axios.post(
    `${API_URLS}products/get_products_by_category/`,
    data
  );
  return res;
};
