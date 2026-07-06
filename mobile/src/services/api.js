import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 🔥 Yeh line add ki hai

const API = axios.create({
<<<<<<< HEAD
  baseURL: 'http://192.168.1.12:5000', // Ya jo bhi tumhara backend URL hai
=======
  BASE_URL: "https://untaken-excusable-announcer.ngrok-free.dev/api", // Ya jo bhi tumhara backend URL hai
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
});

// attach token 
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token"); // 🚀 Ab yeh error nahi dega!
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;