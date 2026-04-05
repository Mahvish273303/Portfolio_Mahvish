import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Attach admin token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers['authorization'] = token;
  }
  return config;
});

export default api;
