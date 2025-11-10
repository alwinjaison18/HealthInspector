import axios from "axios";

// Use Netlify functions in production, local backend in development
const API_BASE_URL = import.meta.env.PROD
  ? "/.netlify/functions"
  : "http://127.0.0.1:8000";

export const getProductBySearch = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    return null;
  }
};

export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/healthcheck`);
    return response.data;
  } catch (error) {
    console.error("Error checking API health:", error);
    return null;
  }
};
