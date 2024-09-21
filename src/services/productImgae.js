import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getProductImageByProductItemsAPI = async (id) => {
  const res = await axios.get(`${API_URLS}product_items/${id}/product_image/`);
  return res;
};
