import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const createOrders = async (data) => {
  const res = await axios.post(`${API_URLS}orders/`, data);
  return res;
};

export const getAllOrdersAPI = async (page, search) => {
  const res = await axios.get(
    `${API_URLS}orders/?page=${page}${search ? "&search=" + search : ""}`
  );
  return res;
};

export const getOrderById = async (id) => {
  const res = await axios.get(`${API_URLS}orders/${id}/`);
  return res;
};
export const updateOrderStatus = async (orderId, data) => {
  const res = await axios.put(`${API_URLS}orders/${orderId}/`, data);
  return res;
};

export const getOrderByUser = async (id) => {
  const res = await axios.get(`${API_URLS}user/${id}/orders/?all=true`);
  return res;
};
