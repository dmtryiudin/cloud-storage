import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      const originalRequest = error.config;
      if (
        error.response.status == 401 &&
        error.config &&
        !error.config._isRepeat
      ) {
        originalRequest._isRepeat = true;
        const REFRESH_TOKEN = await AsyncStorage.getItem("refreshToken");
        const response = await axios.post<AuthResponse>(
          `${API_URL}/auth/refresh`,
          { refreshToken: REFRESH_TOKEN }
        );
        const { accessToken, refreshToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        return axiosInstance.request(originalRequest);
      }
      throw error;
    } catch (error) {
      throw error;
    }
  }
);

export default axiosInstance;
