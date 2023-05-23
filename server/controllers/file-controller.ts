import { NextFunction, Request, Response } from "express";
import { unlink } from "fs";
import path from "path";
import { uuid } from "uuidv4";
import { ApiError } from "../exceptions/api-error";
import fileService from "../service/file-service";
import { IRequestAuth } from "../types/express";

class FileController {
  getAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      res.sendFile(path.resolve(`./upload/avatars/${file}`));
    } catch (e) {
      next(e);
    }
  }

  async createFile(req: IRequestAuth, res: Response, next: NextFunction) {
    const fileName = req.file?.filename;
    try {
      if (!fileName) {
        throw ApiError.BadRequest("No file");
      }

      const owner = req.user.id;
      const { name, folder } = req.headers;

      if (typeof name !== "string") {
        throw ApiError.BadRequest("You should specify a file name");
      }

      if (typeof folder === "object") {
        throw ApiError.BadRequest("You should specify a folder id correctly");
      }
      const newFile = await fileService.createFile(
        name,
        fileName,
        folder,
        owner
      );
      res.json(newFile).status(201);
    } catch (e) {
      console.log(fileName);
      unlink(path.resolve(`./upload/files/${fileName}`), (err) => {
        if (err) return null;
      });
      next(e);
    }
  }

  async downloadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      const fileName = await fileService.downloadFile(file);
      res.download(path.resolve(`./upload/files/${fileName}`));
    } catch (e) {
      next(e);
    }
  }

  async downloadFileProtected(
    req: IRequestAuth,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const file = await fileService.downloadFile(id, req.user.id);

      res.download(path.resolve(`./upload/files/${file}`));
    } catch (e) {
      next(e);
    }
  }
}

export default new FileController();
