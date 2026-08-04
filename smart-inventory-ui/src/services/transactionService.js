import axios from "axios";

const API_URL = "http://localhost:8080/api/transactions";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllTransactions = async () => {
  const response = await axios.get(API_URL, getToken());
  return response.data;
};

export const createTransaction = async (transaction) => {
  const response = await axios.post(
    API_URL,
    transaction,
    getToken()
  );

  return response.data;
};