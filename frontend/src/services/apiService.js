import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const getProductBySearch = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    }
    return null;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${barcode}`);
    console.log("Product response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    }
    return null;
  }
};

export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error checking API health:", error);
    return null;
  }
};
