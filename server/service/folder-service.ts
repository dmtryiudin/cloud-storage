import { ObjectId } from "mongodb";
import { ApiError } from "../exceptions/api-error";
import folderModel from "../models/folder-model";
import userModel from "../models/user-model";

class FolderService {
  async createFolder(owner: string, name: string) {
    const existingFolder = await folderModel.findOne({ name });
    if (existingFolder) {
      throw ApiError.BadRequest("Public folder with this name already exists");
    }

    const newFolder = new folderModel({
      owner: new ObjectId(owner),
      name,
      isPublic: false,
    });

    await newFolder.save();

    return newFolder;
  }

  async setPublic(id: string, userId: string) {
    const folder = await folderModel.findById(id);
    if (!folder) {
      throw ApiError.NotFound();
    }
    if (folder.owner?.toString() !== userId) {
      throw ApiError.Forbidden("You are not allowed to set this folder");
    }

    folder.isPublic = !folder.isPublic;
    await folder.save();
    return folder;
  }
}

export default new FolderService();
