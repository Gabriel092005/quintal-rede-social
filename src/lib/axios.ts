// Configuração do Axios (exemplo)
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://quintal-backend-224.onrender.com',
  withCredentials: true
});

// Interceptor para adicionar o token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Ou cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirecionar para login ou renovar token
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);