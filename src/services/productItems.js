import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const createProductItemAPI = async (data) => {
  const formData = new FormData();
  formData.append("product", data?.productId);
  formData.append("colour", data?.colour);
  if (data?.image_filename instanceof FileList) {
    Array.from(data?.image_filename).forEach((file) => {
      formData.append("image_filename", file);
    });
  }
  formData.append("original_price", data?.original_price);
  formData.append("sale_price", data?.salePrice);
  formData.append("qty_in_stock", data?.qty_in_stock);
  formData.append("size_option", data?.size_option);

  const res = axios.post(
    `${API_URLS}products/${data?.productId}/product_items/`,
    formData
  );
  return res;
};

export const getProductItemsByProductIdAPI = async (id, page, search) => {
  const res = await axios.get(
    `${API_URLS}products/${id}/product_items/?page=${page}${
      search ? "&search=" + search : ""
    }`
  );
  return res;
};

export const deleteProductItemsAPI = async (idProductitem, idProduct) => {
  const res = await axios.delete(
    `${API_URLS}products/${idProduct}/product_items/${idProductitem}/`
  );
  return res;
};

export const deleteManyProductItemsAPI = async (data) => {
  const res = await axios.post(
    `${API_URLS}product_items/delete_many_product_items/`,
    data
  );
  return res;
};

export const getALLProductItemsByProductIdAPI = async (id) => {
  const res = await axios.get(
    `${API_URLS}products/${id}/product_items/?all=true`
  );
  return res;
};

export const getALLProductItemsSearchAPI = async (search) => {
  const res = await axios.get(
    `${API_URLS}product_items/?all=true&search=${search}`
  );
  return res;
};

export const getDetailProductItemsAPI = async (id) => {
  const res = await axios.get(`${API_URLS}product_items/${id}/`);
  return res;
};
