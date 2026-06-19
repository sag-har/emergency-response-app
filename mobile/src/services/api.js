import axios from "axios";

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

export default API;