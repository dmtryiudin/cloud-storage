import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../service/authService";
import { API_URL } from "@env";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUser(newUser: IUser) {
    this.user = newUser;
  }

  async login(login: string, password: string) {
    try {
      const response = await AuthService.login(login, password);
      const { accessToken, refreshToken, user } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.setAuth(true);
      this.setUser(user);
    } catch (e) {
      return null;
    }
  }

  async registration(login: string, password: string) {
    try {
      const response = await AuthService.registration(login, password);
      const { accessToken, refreshToken, user } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.setAuth(true);
      this.setUser(user);
    } catch (e) {
      return null;
    }
  }

  async logout() {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        return;
      }
      await AuthService.logout(refreshToken);
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      return null;
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true);
      const REFRESH_TOKEN = await AsyncStorage.getItem("refreshToken");
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/refresh`,
        { refreshToken: REFRESH_TOKEN }
      );
      const { user, accessToken, refreshToken } = response.data;
      this.setAuth(true);
      this.setUser(user);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
    } catch (e) {
      return null;
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }
}

export const store = new Store();
