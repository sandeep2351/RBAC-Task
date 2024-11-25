import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useApi = () => {
  const fetchData = async (endpoint, method = "GET", data = null) => {
    try {
      const response = await axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "API Error");
    }
  };

  return { fetchData };
};
