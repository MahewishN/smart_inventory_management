import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllProducts = async () => {
  const response = await axios.get(API_URL, getToken());
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product, getToken());
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    getToken()
  );

  return response.data;
};

export const deactivateProduct = async (id) => {
  await axios.patch(
    `${API_URL}/${id}/deactivate`,
    {},
    getToken()
  );
};

export const activateProduct = async (id) => {
  await axios.patch(
    `${API_URL}/${id}/activate`,
    {},
    getToken()
  );
};