import { ObjectId } from "mongodb";
import { FolderDto } from "../dtos/folder-dto";
import { ApiError } from "../exceptions/api-error";
import folderModel from "../models/folder-model";
import { getFilesForFolder } from "../utils";

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

  async deleteAllForUser(owner: string) {
    await folderModel.deleteMany({ owner });
  }

  async getAllPublic(page: number, limit: number) {
    if (limit > 100) {
      limit = 100;
    }
    const folders = await folderModel.find({ isPublic: true });
    const res = [];
    for (let folder of folders) {
      const folderData = { ...new FolderDto(folder) };
      folderData.files = await getFilesForFolder(folder._id.toString());
      res.push(folderData);
    }
    return {
      page,
      limit,
      response: res.slice(page * limit, (page + 1) * limit),
      maxCount: res.length,
    };
  }

  async getForUser(owner: string) {
    const folders = await folderModel.find({
      owner,
      deleteDate: { $exists: false },
    });

    const res = [];
    for (let folder of folders) {
      const folderData = { ...new FolderDto(folder) };
      folderData.files = await getFilesForFolder(folder._id.toString());
      res.push(folderData);
    }
    return res;
  }

  async getTrashForUser(owner: string) {
    const folders = await folderModel.find({
      owner,
      deleteDate: { $exists: true },
    });

    const res = [];
    for (let folder of folders) {
      const folderData = { ...new FolderDto(folder) };
      folderData.files = await getFilesForFolder(folder._id.toString());
      res.push(folderData);
    }
    return res;
  }

  async getOnePublic(id: string) {
    if (!ObjectId.isValid(id)) {
      throw ApiError.NotFound();
    }

    const folder = await folderModel.findById(id);

    if (!folder) {
      throw ApiError.NotFound();
    }

    if (!folder.isPublic) {
      throw ApiError.Forbidden("This folder isn't public");
    }

    const folderData = { ...new FolderDto(folder) };
    folderData.files = await getFilesForFolder(folder._id.toString());
    return folderData;
  }

  async getOnePrivate(id: string, userId: string) {
    if (!ObjectId.isValid(id)) {
      throw ApiError.NotFound();
    }

    const folder = await folderModel.findById(id);

    if (!folder) {
      throw ApiError.NotFound();
    }

    if (folder.owner?.toString() !== userId) {
      throw ApiError.Forbidden("You are not allowed to get this folder");
    }

    const folderData = { ...new FolderDto(folder) };
    folderData.files = await getFilesForFolder(folder._id.toString());
    return folderData;
  }
}

export default new FolderService();
