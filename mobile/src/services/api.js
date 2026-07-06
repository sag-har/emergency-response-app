import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 🔥 Yeh line add ki hai

const API = axios.create({
  baseURL: 'http://192.168.1.12:5000', // Ya jo bhi tumhara backend URL hai
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