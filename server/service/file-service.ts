import { unlink } from "fs";
import { ObjectId } from "mongodb";
import path from "path";
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
      if (!ObjectId.isValid(folder)) {
        throw ApiError.NotFound("Folder does not exist");
      }
      const existingFolder = await folderModel.findById(folder);
      if (!existingFolder) {
        throw ApiError.NotFound("Folder does not exist");
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
    if (file.deleteDate) {
      throw ApiError.BadRequest(
        "You can't download this file while it's in trash"
      );
    }
    return file.href.split("/")[3];
  }

  async setPublic(fileName: string, userId: string) {
    const file = await setFileBelongsToUser(fileName, userId);
    if (file.deleteDate) {
      throw ApiError.BadRequest("You can't set this file while it's in trash");
    }
    const fileHrefArr = file.href.split("/");
    if (file.folder) {
      ApiError.BadRequest(
        "You can't set this file's permission while it's in folder"
      );
    }

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

  async setFolder(fileName: string, owner: string, folderId?: string) {
    let file = await setFileBelongsToUser(fileName, owner);
    if (file.deleteDate) {
      throw ApiError.BadRequest("You can't set this file while it's in trash");
    }
    if (folderId) {
      if (!ObjectId.isValid(folderId)) {
        throw ApiError.NotFound("Folder not found");
      }
      const existingFolder = await folderModel.findById(folderId);
      if (!existingFolder) {
        throw ApiError.NotFound("Folder not found");
      }
      if (existingFolder.owner !== owner) {
        throw ApiError.Forbidden("You don't own this folder");
      }

      file.folder = existingFolder?._id.toString();
      file.isPublic = undefined;
      file.owner = undefined;
      file.deleteDate = undefined;
      await file.save();
      return file;
    }

    file.folder = undefined;
    file.isPublic = false;
    file.owner = owner;
    await file.save();
    return file;
  }

  async moveToTrash(fileName: string, owner: string) {
    let file = await setFileBelongsToUser(fileName, owner);

    if (file.deleteDate) {
      file.deleteDate = undefined;
      await file.save();
      return file;
    }

    const fileHrefArr = file.href.split("/");
    fileHrefArr[2] = "download-protected";
    file.href = fileHrefArr.join("/");
    file.isPublic = false;
    file.owner = owner;
    const deleteDateTimestamp = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    file.deleteDate = deleteDateTimestamp;
    file.folder = undefined;

    await file.save();
    return file;
  }

  async deleteAllForUser(owner: string) {
    const allFiles = await fileModel.find({ owner });

    for (let file of allFiles) {
      const fileName = file.href.split("/")[3];
      unlink(path.resolve(`./upload/files/${fileName}`), (err) => {
        if (err) return null;
      });
    }

    await fileModel.deleteMany({ owner });
  }

  async getAllPublic(page: number, limit: number, extensions: string) {
    if (limit > 100) {
      limit = 100;
    }
    const extensionsArr = extensions.split("~").filter((e) => e);
    const allFiles = await fileModel.find({
      isPublic: true,
    });

    const allFilesPaginated = allFiles.slice(page * limit, (page + 1) * limit);
    const response = extensionsArr.length
      ? allFilesPaginated.filter((file) => {
          const fileName = file.href.split("/")[3];
          const extension = fileName.split(".")[fileName.split(".").length - 1];
          return extensionsArr.includes(extension);
        })
      : allFilesPaginated;
    return {
      page,
      limit,
      response,
      maxCount: response.length,
    };
  }

  async getForUser(owner: string, extensions: string) {
    const extensionsArr = extensions.split("~").filter((e) => e);

    const allFiles = await fileModel.find({
      owner,
      deleteDate: { $exists: false },
      folder: { $exists: false },
    });
    return extensionsArr.length
      ? allFiles.filter((file) => {
          const fileName = file.href.split("/")[3];
          const extension = fileName.split(".")[fileName.split(".").length - 1];
          return extensionsArr.includes(extension);
        })
      : allFiles;
  }

  async getTrashForUser(owner: string, extensions: string) {
    const extensionsArr = extensions.split("~").filter((e) => e);
    const allFiles = await fileModel.find({
      owner,
      deleteDate: { $exists: true },
      folder: { $exists: false },
    });
    return extensionsArr.length
      ? allFiles.filter((file) => {
          const fileName = file.href.split("/")[3];
          const extension = fileName.split(".")[fileName.split(".").length - 1];
          return extensionsArr.includes(extension);
        })
      : allFiles;
  }
}

export default new FileService();
