import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../http";

export default class ModService {
  static async banUser(
    login: string,
    reason: string
  ): Promise<AxiosResponse<IUser>> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return await axiosInstance.put<IUser>(
      `/mod/ban/${login}`,
      { reason },
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
