import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import axiosInstance from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await axiosInstance.post<AuthResponse>("/auth/login", {
      login,
      password,
    });
  }

  static async registration(
    login: string,
    password: string,
    name: string,
    country: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await axiosInstance.post<AuthResponse>("/auth/registration", {
      login,
      password,
      name,
      country,
    });
  }

  static async logout(refreshToken: string): Promise<void> {
    await axiosInstance.post<AuthResponse>("/auth/logout", {
      refreshToken,
    });
  }

  static async setEmail(email: string): Promise<AxiosResponse<AuthResponse>> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return await axiosInstance.put<AuthResponse>(
      "/auth/email",
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  }
}
