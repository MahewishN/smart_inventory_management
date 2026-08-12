import axios from "axios";

const API_URL = "http://localhost:8080/api/notifications";

const getToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

// Get all notifications for the logged-in user
export const getMyNotifications = async () => {
    const response = await axios.get(API_URL, getToken());
    return response.data;
};

// Get unread notification count
export const getUnreadCount = async () => {
    const response = await axios.get(
        `${API_URL}/unread-count`,
        getToken()
    );

    return response.data;
};

// Mark one notification as read
export const markNotificationAsRead = async (id) => {
    await axios.patch(
        `${API_URL}/${id}/read`,
        {},
        getToken()
    );
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
    await axios.patch(
        `${API_URL}/read-all`,
        {},
        getToken()
    );
};