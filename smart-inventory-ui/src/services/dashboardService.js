import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getDashboardData = async () => {
    const response = await axios.get(
        `${API_URL}/summary`,
        getHeaders()
    );

    return response.data;
};

export const getRestockRecommendations = async () => {
    const response = await axios.get(
        `${API_URL}/restock-recommendations`,
        getHeaders()
    );

    return response.data;
};

export const getDemandForecast = async () => {
    const response = await axios.get(
        `${API_URL}/demand-forecast`,
        getHeaders()
    );

    return response.data;
};