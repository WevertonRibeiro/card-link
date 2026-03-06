import axios from "axios";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

import { env } from "@/config/env";

export const api = axios.create({
  baseURL: env.apiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();

    if (error.response?.status === 401) {
      authStore.clearSession()
    }

    return Promise.reject(error);
  }
);