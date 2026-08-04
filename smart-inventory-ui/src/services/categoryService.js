import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllCategories = async () => {
  const response = await axios.get(API_URL, getToken());
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(API_URL, category, getToken());
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    category,
    getToken()
  );

  return response.data;
};

export const deactivateCategory = async (id) => {
  await axios.patch(
    `${API_URL}/${id}/deactivate`,
    {},
    getToken()
  );
};

export const activateCategory = async (id) => {
  await axios.patch(
    `${API_URL}/${id}/activate`,
    {},
    getToken()
  );
};