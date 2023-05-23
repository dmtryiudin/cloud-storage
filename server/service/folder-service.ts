import { ObjectId } from "mongodb";
import { ApiError } from "../exceptions/api-error";
import folderModel from "../models/folder-model";

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
    if (!ObjectId.isValid(id)) {
      throw ApiError.NotFound();
    }
    const folder = await folderModel.findById(id);
    if (!folder) {
      throw ApiError.NotFound();
    }

    if (folder.owner?.toString() !== userId) {
      throw ApiError.Forbidden("You are not allowed to set this folder");
    }

    if (folder.deleteDate) {
      throw ApiError.BadRequest(
        "You can't set this folder while it's in trash"
      );
    }

    folder.isPublic = !folder.isPublic;
    await folder.save();
    return folder;
  }

  async moveToTrash(id: string, userId: string) {
    if (!ObjectId.isValid(id)) {
      throw ApiError.NotFound();
    }

    const folder = await folderModel.findById(id);
    if (!folder) {
      throw ApiError.NotFound();
    }
    if (folder.owner?.toString() !== userId) {
      throw ApiError.Forbidden("You are not allowed to set this folder");
    }

    if (folder.deleteDate) {
      folder.deleteDate = undefined;
      await folder.save();
      return folder;
    }

    const deleteDateTimestamp = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    folder.deleteDate = new Date(deleteDateTimestamp);
    folder.isPublic = false;
    await folder.save();
    return folder;
  }
}

export default new FolderService();
