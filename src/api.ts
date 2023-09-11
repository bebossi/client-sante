import axios, { AxiosRequestConfig } from "axios";

export const apiURLs = {
  development: "http://localhost:4121",
  production: "",
};

const api = axios.create({
  baseURL: apiURLs["development"],
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");

  const token = document.cookie.split("=")[1];

  if (token) {
    (config as AxiosRequestConfig).headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export { api };
