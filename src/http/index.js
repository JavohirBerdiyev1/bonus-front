// http.js
import axios from 'axios';

// Misol uchun to'g'ridan-to'g'ri baseURL ni ko'rsatamiz:
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_ADMIN_API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Har bir so'rov oldidan tokenni headerda yuborish
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('client-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;


// /api/v1