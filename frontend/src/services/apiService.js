import axios from "axios";

// Use Netlify functions in production, local backend in development
const API_BASE_URL = import.meta.env.PROD
  ? "/.netlify/functions"
  : "http://127.0.0.1:8000";

export const getProductBySearch = async (query) => {
  try {
    // In production: /.netlify/functions/search
    // In development: http://127.0.0.1:8000/product/search
    const endpoint = import.meta.env.PROD
      ? `${API_BASE_URL}/search`
      : `${API_BASE_URL}/product/search`;

    const response = await axios.get(endpoint, {
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
    // In production: /.netlify/functions/healthcheck
    // In development: http://127.0.0.1:8000/
    const endpoint = import.meta.env.PROD
      ? `${API_BASE_URL}/healthcheck`
      : `${API_BASE_URL}/`;

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error checking API health:", error);
    return null;
  }
};
