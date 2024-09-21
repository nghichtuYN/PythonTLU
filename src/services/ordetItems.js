import axios from "axios";
const API_URLS = process.env.REACT_APP_API;

export const getOrderItemsByOrderID = async (id) => {
  const res = await axios.get(`${API_URLS}orders/${id}/order_items/`);
  return res;
};
