import axios from "axios";
import { updateProduct } from "./products";
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
  if (data?.hasChange) {
    const results = await Promise.all([
      updateProduct(data?.productId, {
        product_name: data?.product_name,
        product_description: data?.product_description,
        product_category: data?.product_category,
        brand: data?.brand,
      }),
      axios.post(
        `${API_URLS}products/${data?.productId}/product_items/`,
        formData
      ),
    ]);
    return results;
  } else {
    const res = axios.post(
      `${API_URLS}products/${data?.productId}/product_items/`,
      formData
    );
    return res;
  }
};

export const getProductItemsByProductIdAPI = async (
  navigate,
  id,
  page,
  search
) => {
  if (search) {
    navigate(`/admin/product/detailProduct/${id}?page=${1}`);
  }
  const res = await axios.get(
    `${API_URLS}products/${id}/product_items/?page=${search ? 1 : page}${
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

export const getDetailProductItemsAPI = async (id) => {
  const res = await axios.get(`${API_URLS}product_items/${id}/`);
  return res;
};
