import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../http";

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
}
