import axios, { AxiosResponse } from "axios";
import  { AxiosInstance } from 'axios';

// Define the base URL from environment variables
export const axiosRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Add the correct base URL
});

// Add TypeScript typing for interceptors
axiosRequest.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor with error handling
axiosRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
