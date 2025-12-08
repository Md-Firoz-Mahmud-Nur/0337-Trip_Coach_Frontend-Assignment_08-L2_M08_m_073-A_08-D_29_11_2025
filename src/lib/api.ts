import axios from "axios";
import { useAuthStore } from "./store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const { accessToken: token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
