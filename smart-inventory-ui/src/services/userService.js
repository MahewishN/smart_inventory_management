import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getAllUsers = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const createUser = async (user) => {
    const response = await axios.post(API_URL, user, getHeaders());
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        user,
        getHeaders()
    );

    return response.data;
};

export const deactivateUser = async (id) => {
    await axios.patch(
        `${API_URL}/${id}/deactivate`,
        {},
        getHeaders()
    );
};

export const activateUser = async (id) => {
    await axios.patch(
        `${API_URL}/${id}/activate`,
        {},
        getHeaders()
    );
};