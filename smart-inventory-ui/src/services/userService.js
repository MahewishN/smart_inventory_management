import axios from "axios";

const API_URL = "http://localhost:8080/api/users";
const PROFILE_API_URL = "http://localhost:8080/api/profile";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

// =====================================================
// USER / ADMIN APIs
// =====================================================

export const getAllUsers = async () => {
    const response = await axios.get(
        API_URL,
        getHeaders()
    );

    return response.data;
};

export const createUser = async (user) => {
    const response = await axios.post(
        API_URL,
        user,
        getHeaders()
    );

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

// =====================================================
// CURRENT USER PROFILE APIs
// =====================================================

export const getMyProfile = async () => {
    const response = await axios.get(
        PROFILE_API_URL,
        getHeaders()
    );

    return response.data;
};

export const updateMyProfile = async (profileData) => {
    const response = await axios.put(
        PROFILE_API_URL,
        profileData,
        getHeaders()
    );

    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await axios.put(
        `${PROFILE_API_URL}/change-password`,
        passwordData,
        getHeaders()
    );

    return response.data;
};