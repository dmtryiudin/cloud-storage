import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../http";
import { addQueryParams } from "../utils/addQueryParams";

export default class FoldersService {
  static async getFoldersForUser() {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.get("/folder/user", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async createFolder(name: string) {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.post(
      "/folder",
      { name },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  }

  static async getPrivateFolder(id: string) {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.get("/folder/private/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async getPublicFolder(id: string) {
    return axiosInstance.get("/folder/public/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  static async renameFolder(id: string, newName: string) {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.put(
      "/folder/rename/" + id,
      { newName },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  }

  static async setFolderPublic(id: string) {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.put("/folder/set-public/" + id, undefined, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async deleteFolder(id: string) {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.delete("/folder/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async getFoldersFromTrash() {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return await axiosInstance.get("/folder/trash", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async getPublicFolders(
    page?: string,
    limit?: string,
    substr?: string
  ) {
    return await axiosInstance.get(
      "/folder/public" +
        addQueryParams({
          page,
          limit,
          substr,
        }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
