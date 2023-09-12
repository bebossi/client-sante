import axios from "axios";

axios.defaults.withCredentials = true;

export const apiURLs = {
  development: "http://localhost:4121",
  production: "https://api-sante.onrender.com",
};

const api = axios.create({
  withCredentials: true,
  baseURL: apiURLs["production"],
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");

  // const token = document.cookie.split("=")[1];

  // const token = Cookies.get("token");

  // if (token) {
  // (config as AxiosRequestConfig).headers = {
  //   ...config.headers,
  //   Authorization: `Bearer `,
  // };
  // }

  // if (config.headers && config.headers.Authorization) {
  //   console.log("Authorization Header:", config.headers.Authorization);
  // } else {
  //   console.log("Authorization Header not found in the request.");
  // }
  return config;
});

export { api };
