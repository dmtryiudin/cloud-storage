import { ApiError } from "../exceptions/api-error";
import fileModel from "../models/file-model";
import folderModel from "../models/folder-model";
import { getFileBelongsToUser, setFileBelongsToUser } from "../utils";

class FileService {
  async createFile(name: string, href: string, owner: string, folder?: string) {
    const existingFileName = await fileModel.findOne({ name });
    if (existingFileName) {
      throw ApiError.BadRequest("Public file with this name already exists");
    }

    if (folder) {
      const existingFolder = await folderModel.findById(folder);
      if (!existingFolder) {
        throw ApiError.NotFound("Folder not exists");
      }

      if (existingFolder.owner !== owner) {
        throw ApiError.Forbidden("You don't own this folder");
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
    const file = await getFileBelongsToUser(fileName, userId);
    return file.href.split("/")[3];
  }

  async setPublic(fileName: string, userId: string) {
    const file = await setFileBelongsToUser(fileName, userId);
    const fileHrefArr = file.href.split("/");
    if (file.isPublic) {
      file.isPublic = false;
      fileHrefArr[2] = "download-protected";
    } else {
      file.isPublic = true;
      fileHrefArr[2] = "download";
    }

    file.href = fileHrefArr.join("/");
    await file.save();
    return file;
  }
}

export default new FileService();
