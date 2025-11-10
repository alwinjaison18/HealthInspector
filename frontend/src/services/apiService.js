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
    // In production: /.netlify/functions/product?barcode={barcode}
    // In development: http://127.0.0.1:8000/product/{barcode}
    const endpoint = import.meta.env.PROD
      ? `${API_BASE_URL}/product`
      : `${API_BASE_URL}/product/${barcode}`;

    const config = import.meta.env.PROD ? { params: { barcode } } : {};

    console.log("Fetching product:", {
      barcode,
      endpoint,
      config,
      isProd: import.meta.env.PROD,
    });

    const response = await axios.get(endpoint, config);
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
