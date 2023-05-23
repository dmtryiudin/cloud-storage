import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import axiosInstance from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "@env";

export default class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await axiosInstance.post<AuthResponse>(
      "/auth/login",
      {
        login,
        password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }

  static async registration(
    login: string,
    password: string,
    name: string,
    country: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await axiosInstance.post<AuthResponse>(
      "/auth/registration",
      {
        login,
        password,
        name,
        country,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }

  static async logout(): Promise<void> {
    const REFRESH_TOKEN = await AsyncStorage.getItem("refreshToken");
    await axiosInstance.post<AuthResponse>(
      "/auth/logout",
      {
        refreshToken: REFRESH_TOKEN,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  }
}
