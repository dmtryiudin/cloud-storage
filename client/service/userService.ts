import { AxiosResponse } from "axios";
import { IPaginatedUsers, IUser } from "../models/IUser";
import axiosInstance from "../http";
import { addQueryParams } from "../utils/addQueryParams";
import { validateLogin } from "../utils/validateLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import RNFetchBlob from "rn-fetch-blob";

export default class UserService {
  static async getUsers(
    page: string,
    limit: string
  ): Promise<AxiosResponse<IPaginatedUsers>> {
    const url = "/user" + addQueryParams({ page, limit });
    return await axiosInstance.get<IPaginatedUsers>(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  static async getUser(login: string): Promise<AxiosResponse<IUser>> {
    return await axiosInstance.get<IUser>(`/user/${validateLogin(login)}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  static async updateUser(
    name: string,
    country: string,
    avatar: DocumentPicker.DocumentResult | null
  ): Promise<void> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    if (name || country) {
      await axiosInstance.put(
        "/user",
        { name, country },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
    }

    if (avatar) {
      if (avatar.type === "success") {
        const response = await fetch(avatar.uri);
        const blob = await response.blob();

        const data = new FormData();
        data.append("avatar", blob, avatar.name);

        await axiosInstance.put("/user/avatar", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
      }
    }
  }
}
