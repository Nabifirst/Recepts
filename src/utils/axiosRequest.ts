import axios, { AxiosResponse } from "axios";
import  { AxiosInstance } from 'axios';

export const axiosRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, 
});

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

axiosRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
