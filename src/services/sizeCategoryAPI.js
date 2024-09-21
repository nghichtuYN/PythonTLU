import axios from "axios";
const API_URLS = process.env.REACT_APP_API;

export const getAllSizeCategoriesAPI = async (page) => {
  const res = await axios.get(`${API_URLS}size_category/?page=${page}`);
  return res;
};

export const getDetailSizeCategoryByIdAPI = async (id) => {
  const res = await axios.get(`${API_URLS}size_category/${id}/`);
  return res;
};

export const getSizeCategoryBySearchAPI = async (searchValue, page) => {
  const res = await axios.get(
    `${API_URLS}size_category/?page=${page}&search=${encodeURIComponent(
      searchValue
    )}`
  );
  return res;
};
export const getAllSizeCategoriesNoPaninationAPI = async () => {
  const res = await axios.get(`${API_URLS}size_category/no_pagination/`);
  return res;
};

export const addSizeCategory = async (data) => {
  const res = await axios.post(`${API_URLS}size_category/`, data);
  return res;
};

export const deleteSizeCategories = async (data) => {
  const res = await axios.post(
    `${API_URLS}size_category/delete_many_size_categories/`,
    data
  );
  return res;
  
};
export const deleteSingleSizeCategory = async (id) => {
  const res = await axios.delete(`${API_URLS}size_category/${id}/`);
  return res;
};

export const updateSizeCategoryAPI = async (id, data) => {
  const res = await axios.put(`${API_URLS}size_category/${id}/`, data);
  return res;
};
