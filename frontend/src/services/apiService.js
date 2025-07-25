import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend

export const getProductBySearch = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/search`, {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};
