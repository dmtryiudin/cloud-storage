import { AxiosResponse } from "axios";
import { ISettings } from "../models/response/ISettings";
import axiosInstance from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SettingsService {
  static async updateSettings(settings: ISettings): Promise<void> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    await axiosInstance.put("/settings", settings, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async getSettings(): Promise<AxiosResponse<ISettings>> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return await axiosInstance.get<ISettings>("/settings", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
}
