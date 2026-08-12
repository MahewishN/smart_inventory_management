import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});


// ===============================
// DASHBOARD SUMMARY
// ===============================

export const getDashboardData = async () => {
    const response = await axios.get(
        `${API_URL}/summary`,
        getHeaders()
    );

    return response.data;
};


// ===============================
// RESTOCK RECOMMENDATIONS
// ===============================

export const getRestockRecommendations = async () => {
    const response = await axios.get(
        `${API_URL}/restock-recommendations`,
        getHeaders()
    );

    return response.data;
};


// ===============================
// DEMAND FORECAST
// ===============================

export const getDemandForecast = async () => {
    const response = await axios.get(
        `${API_URL}/demand-forecast`,
        getHeaders()
    );

    return response.data;
};


// ===============================
// MONTHLY SALES
// ===============================

export const getMonthlySales = async () => {
    const response = await axios.get(
        `${API_URL}/monthly-sales`,
        getHeaders()
    );

    return response.data;
};


// ===============================
// MONTHLY PURCHASES
// ===============================

export const getMonthlyPurchases = async () => {
    const response = await axios.get(
        `${API_URL}/monthly-purchases`,
        getHeaders()
    );

    return response.data;
};


// ===============================
// STOCK BY CATEGORY
// ===============================

export const getStockByCategory = async () => {
    const response = await axios.get(
        `${API_URL}/stock-by-category`,
        getHeaders()
    );

    return response.data;
};


// ===============================
// TOP SELLING PRODUCTS
// ===============================

export const getTopSellingProducts = async () => {
    const response = await axios.get(
        `${API_URL}/top-selling-products`,
        getHeaders()
    );

    return response.data;
};

// ===============================
// DOWNLOAD DASHBOARD PDF
// ===============================

export const downloadDashboardPdf = async () => {

    const response = await axios.get( `${API_URL}/pdf`,
        {
            ...getHeaders(),
            responseType: "blob",
        }
    );

    const blob = new Blob(
        [response.data],
        { type: "application/pdf" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "SmartShelfX-Dashboard-Report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
};