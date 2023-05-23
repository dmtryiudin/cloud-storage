import { ApiError } from "../exceptions/api-error";
import fileModel from "../models/file-model";
import folderModel from "../models/folder-model";

class FileService {
  async createFileSignature(
    name: string,
    href: string,
    folder?: string,
    owner?: string
  ) {
    const existingFileName = await fileModel.findOne({ name });
    if (existingFileName) {
      throw ApiError.BadRequest("Public file with this name already exists");
    }
    const existingFileHref = await fileModel.findOne({ href });
    if (existingFileHref) {
      throw ApiError.BadRequest("Public file with this href already exists");
    }
    if (folder) {
      const existingFolder = await folderModel.findById(folder);
      if (!existingFolder) {
        throw ApiError.NotFound("Folder not exists");
      }

      const newFile = new fileModel({
        name,
        folder,
        href,
      });

      await newFile.save();
      return newFile;
    }

    const newFile = new fileModel({
      owner,
      href,
      name,
    });

    await newFile.save();
    return newFile;
  }
}

export default new FileService();
