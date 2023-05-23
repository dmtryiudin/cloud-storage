import { ObjectId } from "mongodb";
import { ApiError } from "../exceptions/api-error";
import fileModel from "../models/file-model";
import folderModel from "../models/folder-model";

class FileService {
  async createFile(
    name: string,
    href: string,
    folder?: string,
    owner?: string
  ) {
    const existingFileName = await fileModel.findOne({ name });
    if (existingFileName) {
      throw ApiError.BadRequest("Public file with this name already exists");
    }

    if (folder) {
      const existingFolder = await folderModel.findById(folder);
      if (!existingFolder) {
        throw ApiError.NotFound("Folder not exists");
      }

      const newFile = new fileModel({
        name,
        folder,
        href: `/file/download-protected/${href}`,
      });

      await newFile.save();
      return newFile;
    }

    const newFile = new fileModel({
      owner,
      name,
      isPublic: false,
      href: `/file/download-protected/${href}`,
    });

    await newFile.save();
    return newFile;
  }

  async downloadFile(fileName: string, userId?: string) {
    const file = await fileModel.findOne({
      href: `/file/download-protected/${fileName}`,
    });
    if (!file) {
      throw ApiError.NotFound("File not found");
    }
    if (userId) {
      if (file.owner && file.owner.toString() === userId) {
        return file.href.split("/")[3];
      }

      if (!file.folder) {
        throw ApiError.Forbidden("You are not allowed to access this file");
      }

      const fileFolder = await folderModel.findById(file.folder);
      if (fileFolder!.owner !== userId) {
        throw ApiError.Forbidden("You are not allowed to access this file");
      }

      return file.href.split("/")[3];
    }

    if (file.isPublic) {
      return file.href.split("/")[3];
    }
    throw ApiError.Forbidden("You are not allowed to access this file");
  }
}

export default new FileService();
