import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getAllProductParentCategoriesAPI = async () => {
  const res = await axios.get(`${API_URLS}product_category/top_two/`);
  return res;
};
export const getAllChildCategoresByID = async (id) => {
  const res = await axios.get(
    `${API_URLS}product_category/${id}/get_child_categories/`
  );
  return res;
};
export const getAllCategoriesAPI = async (page, search) => {
  const res = await axios.get(
    `${API_URLS}product_category/?page=${page}${
      search ? "&search=" + search : ""
    }`
  );
  return res;
};
export const getCategoryById = async (id) => {
  const res = await axios.get(`${API_URLS}product_category/${id}/`);
  return res;
};
export const getCategoryBySearch = async (searchValue, page) => {
  const res = await axios.get(
    `${API_URLS}product_category/?page=${page}&search=${encodeURIComponent(
      searchValue
    )}`
  );
  return res;
};
export const getAllCategoriesNoPaninationAPI = async () => {
  const res = await axios.get(`${API_URLS}product_category/?all=true`);
  return res;
};
export const updateCategoryAPI = async (id, data) => {
  const res = await axios.put(`${API_URLS}product_category/${id}/`, data);
  return res;
};
export const createCategory = async (data) => {
  const res = await axios.post(`${API_URLS}product_category/`, data);
  return res;
};
export const deleteCategories = async (data) => {
  const res = await axios.post(
    `${API_URLS}product_category/delete_many_categories/`,
    data
  );
  return res;
};
export const deleteChildCategories = async (id, data) => {
  const res = await axios.post(
    `${API_URLS}product_category/${id}/delete_child_category/`,
    data
  );
  return res;
};
export const addChildCategories = async (id, data) => {
  const res = await axios.post(
    `${API_URLS}product_category/${id}/add_child_categories/`,
    data
  );
  return res;
};
export const deleteSingleCategory = async (id) => {
  const res = await axios.delete(`${API_URLS}product_category/${id}/`);
  return res;
};
