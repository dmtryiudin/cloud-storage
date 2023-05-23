import { unlink } from "fs";
import { ObjectId } from "mongodb";
import path from "path";
import { FolderDto } from "../dtos/folder-dto";
import { ApiError } from "../exceptions/api-error";
import fileModel from "../models/file-model";
import folderModel from "../models/folder-model";
import userModel from "../models/user-model";
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

    const ownerData = await userModel.findById(userId);

    if (folder.deleteDate) {
      folder.deleteDate = undefined;
      await folder.save();

      ownerData!.filesCapacity =
        ownerData!.filesCapacity + folder.filesCapacity;
      await ownerData!.save();

      return folder;
    }

    const deleteDateTimestamp = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    folder.deleteDate = deleteDateTimestamp;
    folder.isPublic = false;
    await folder.save();

    ownerData!.filesCapacity = ownerData!.filesCapacity - folder.filesCapacity;
    await ownerData!.save();

    return folder;
  }

  async deleteAllForUser(owner: string) {
    const folders = await folderModel.find({ owner });
    for (let folder of folders) {
      const filesList = await getFilesForFolder(folder._id.toString());
      for (let file of filesList) {
        const fileName = file.href.split("/")[3];
        unlink(path.resolve(`./upload/files/${fileName}`), (err) => {
          if (err) return null;
        });
      }

      await fileModel.deleteMany({
        folder: folder._id.toString(),
      });
    }

    await folderModel.deleteMany({
      owner,
    });
  }

  async getAllPublic(page: number, limit: number, substr: string) {
    if (limit > 100) {
      limit = 100;
    }
    let folders = await folderModel.find({ isPublic: true });
    const res = [];
    if (substr.trim()) {
      folders = folders.filter(
        (e) => e.name.toLowerCase().indexOf(substr.toLowerCase().trim()) >= 0
      );
    }
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

  async rename(owner: string, folder: string, newName: string) {
    if (!ObjectId.isValid(folder)) {
      throw ApiError.NotFound();
    }

    const currentFolder = await folderModel.findById(folder);

    if (!currentFolder) {
      throw ApiError.NotFound();
    }

    if (currentFolder.owner?.toString() !== owner) {
      throw ApiError.Forbidden("You are not allowed to get this folder");
    }

    const folderWithSameName = await folderModel.findOne({ name: newName });
    if (folderWithSameName) {
      throw ApiError.BadRequest("Public folder with this name already exists");
    }
    currentFolder.name = newName;
    await currentFolder.save();
    return currentFolder;
  }
}

export default new FolderService();
