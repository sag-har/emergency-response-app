import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAuth } from "../storage/authStorage";

const API = axios.create({
  baseURL: "http://192.168.0.107:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token 
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearAuth();
    }

    return Promise.reject(error);
  }
);

export default API;
