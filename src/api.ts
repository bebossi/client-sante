import axios from 'axios';

axios.defaults.withCredentials = true;

export const apiURLs = {
  development: 'http://localhost:4122',
  production: 'https://api-sante.onrender.com',
};

const api = axios.create({
  withCredentials: true,
  baseURL: apiURLs['development'],
});

api.interceptors.request.use((config) => {
  return config;
});

export { api };
