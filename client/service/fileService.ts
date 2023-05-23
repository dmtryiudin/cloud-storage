import * as DocumentPicker from "expo-document-picker";
import axiosInstance from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { IFile } from "../models/IFile";
import { API_URL } from "@env";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { getFileName } from "../utils/getFileName";

export default class FileService {
  static async uploadFile(
    name: string,
    file: DocumentPicker.DocumentResult,
    folder?: string
  ): Promise<void> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    if (file.type === "success") {
      const data = new FormData();

      const fileData = {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as any;

      data.append("file", fileData);

      if (folder) {
        await axiosInstance.post("/file/upload", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            name,
            folder,
          },
        });
      } else {
        await axiosInstance.post("/file/upload", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            name,
          },
        });
      }
    }
  }

  static async getFilesForUser(): Promise<AxiosResponse<IFile[]>> {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    return axiosInstance.get("/file/user", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  static async downloadProtectedFile(href: string) {
    const ACCESS_TOKEN = await AsyncStorage.getItem("accessToken");
    const fileName = getFileName(href);
    const result = await FileSystem.downloadAsync(
      API_URL + href,
      FileSystem.documentDirectory + fileName,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    await shareAsync(result.uri);
  }

  static async downloadFile(href: string) {
    const fileName = getFileName(href);
    const result = await FileSystem.downloadAsync(
      API_URL + href,
      FileSystem.documentDirectory + fileName
    );
    await shareAsync(result.uri);
  }
}
