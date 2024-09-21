import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const getProductVariationByProductItemsAPI = async (id) => {
  const res = await axios.get(
    `${API_URLS}product_items/${id}/product_variation/`
  );
  return res;
};
export const createProductVariationByProductItemsAPI = async (data) => {
  const { product_items } = data;
  const res = await axios.post(
    `${API_URLS}product_items/${product_items}/product_variation/`,data
  );
  return res;
};

export const getAllProductVaritaionNoPanination = async (id) => {
  const res = await axios.get(
    `${API_URLS}product_items/${id}/product_variation/no_pagination/`
  );
  return res;
};
