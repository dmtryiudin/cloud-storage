import { unlink } from "fs";
import path from "path";
import fileModel from "../models/file-model";
import folderModel from "../models/folder-model";
import { getFilesForFolder } from "../utils";

export const removeExpiredFiles = async () => {
  try {
    const independentFiles = await fileModel.find({
      deleteDate: { $gt: new Date().getTime() },
    });

    for (let file of independentFiles) {
      const fileName = file.href.split("/")[3];
      unlink(path.resolve(`./upload/files/${fileName}`), (err) => {
        if (err) return null;
      });
    }

    await fileModel.deleteMany({
      deleteDate: { $gt: new Date().getTime() },
    });

    const folders = await folderModel.find({
      deleteDate: { $gt: new Date().getTime() },
    });

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
      deleteDate: { $gt: new Date().getTime() },
    });
    console.log("Expired files removed");
  } catch (e) {
    console.log(e);
  }
};
