import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// CHANGE THIS TO YOUR PC IP
// Example: 192.168.0.107
const API = axios.create({
<<<<<<< Updated upstream
  baseURL: "http://192.168.1.23:5000/api",
=======
  baseURL: "http://192.168.1.10:5000/api",
>>>>>>> Stashed changes
  timeout: 10000,
});

// Attach JWT token automatically
API.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers["Content-Type"] = "application/json";

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      message =
        error.response.data?.message ||
        `Server Error (${error.response.status})`;
    } else if (error.request) {
      message =
        "Cannot connect to server. Check your internet connection.";
    }

    return Promise.reject({
      ...error,
      message,
    });
  }
);

// AUTH
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

// EMERGENCY REQUESTS
export const createEmergencyRequest = (data) =>
  API.post("/emergency", data);

export const getEmergencyRequest = (id) =>
  API.get(`/emergency/${id}`);

export const getUserEmergencyHistory = (userId) =>
  API.get(`/emergency?userId=${userId}`);

export default API;