import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../service/authService";
import { API_URL } from "@env";
import axios, { AxiosError } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { Error } from "../models/IError";
import { ISettings } from "../models/response/ISettings";
import SettingsService from "../service/settingsService";
import UserService from "../service/userService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  error = null as Error;
  settings = {} as ISettings;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUser(newUser: IUser) {
    this.user = newUser;
  }

  setSettings(settings: ISettings) {
    this.settings = settings;
  }

  async login(login: string, password: string) {
    try {
      this.setLoading(true);
      const response = await AuthService.login(login, password);
      const { accessToken, refreshToken, user } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.setAuth(true);
      this.setUser(user);
      this.setError();
    } catch (e: AxiosError | any) {
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  async registration(
    login: string,
    password: string,
    name: string,
    country: string
  ) {
    try {
      this.setLoading(true);
      const response = await AuthService.registration(
        login,
        password,
        name,
        country
      );
      const { accessToken, refreshToken, user } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.setAuth(true);
      this.setUser(user);
      this.setError();
    } catch (e: AxiosError | any) {
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      this.setLoading(true);
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        return;
      }
      await AuthService.logout();
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUser);
      this.setError();
    } catch (e: AxiosError | any) {
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteUser() {
    try {
      this.setLoading(true);
      await UserService.deleteUser();
      await this.logout();
    } catch (e: AxiosError | any) {
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  async updateSettings(settings: ISettings) {
    try {
      this.setLoading(true);
      await SettingsService.updateSettings(settings);
      this.setSettings(settings);
    } catch (e: AxiosError | any) {
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  async getSettings() {
    try {
      this.setLoading(true);
      const { data } = await SettingsService.getSettings();
      this.setSettings(data);
    } catch (e: AxiosError | any) {
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true);
      const REFRESH_TOKEN = await AsyncStorage.getItem("refreshToken");
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/refresh`,
        { refreshToken: REFRESH_TOKEN },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { user, accessToken, refreshToken } = response.data;
      this.setAuth(true);
      this.setUser(user);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.setError();
    } catch (e: AxiosError | any) {
      await this.logout();
      this.setError(e?.response?.status, e?.response?.data);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setError(): void;
  setError(statusCode: number, data: any): void;
  setError(statusCode?: number, data?: any) {
    if (statusCode && data) {
      this.error = { statusCode, data };
    } else {
      this.error = null;
    }
  }
}

export const store = new Store();
