import axios from "axios";
import { getToken } from "../storage/authStorage";

const API = axios.create({
  baseURL: "http://192.168.0.107:5000/api",
  timeout: 10000,
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();

  console.log("Stored Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Headers:", config.headers);

  return config;
});

export default API;