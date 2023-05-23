import { ApiError } from "../exceptions/api-error";
import folderModel from "../models/folder-model";
import userModel from "../models/user-model";

class FolderService {
  async createFolder(owner: string, name: string) {
    const user = await userModel.findById(owner);

    const existingFolder = await folderModel.findOne({ name });
    if (existingFolder) {
      throw ApiError.BadRequest("Public folder with this name already exists");
    }

    const newFolder = new folderModel({
      owner: user!._id,
      name,
      isPublic: false,
    });

    await newFolder.save();

    return newFolder;
  }
}

export default new FolderService();
