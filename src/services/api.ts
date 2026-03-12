import axios from "axios";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

import { env } from "@/config/env";

import mockData from "./mockData.json";

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

    // Check if the error is a network error or a 5xx server error
    const isNetworkError = !error.response;
    const isServerError = error.response && error.response.status >= 500;

    if (isNetworkError || isServerError) {
      const url = error.config?.url || "";
      console.warn(
        `[API Fallback] Request to ${url} failed. Serving mock data.`
      );
      
      let data: any = null;

      if (url.includes("/me")) {
        data = mockData.me;
      } else if (url.includes("/login")) {
        data = mockData.login;
      } else if (url.includes("/register")) {
        data = mockData.register;
      } else if (url.includes("/cards")) {
        data = mockData.cards;
      } else if (url.includes("/trades")) {
        data = mockData.trades;
      }

      if (data) {
        // Return a successful response shaped object to bypass the error
        return Promise.resolve({
          data,
          status: 200,
          statusText: "OK",
          headers: {},
          config: error.config,
          request: error.request
        });
      }
    }

    return Promise.reject(error);
  }
);