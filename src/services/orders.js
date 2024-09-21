import axios from "axios";
const API_URLS = process.env.REACT_APP_API;
export const createOrders = async (data) => {
  const res = await axios.post(`${API_URLS}orders/`, data);
  return res;
};

export const getAllOrdersAPI = async (page, search, navigate) => {
  if (search) {
    navigate(`/admin/orders/?page=${1}&search=${search}`);
  }
  const res = await axios.get(
    `${API_URLS}orders/?page=${search ? 1 : page}${
      search ? "&search=" + search : ""
    }`
  );
  return res;
};
