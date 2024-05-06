import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
