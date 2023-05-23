import { NextFunction, Request, Response } from "express";
import path from "path";
import { uuid } from "uuidv4";
import { ApiError } from "../exceptions/api-error";
import fileService from "../service/file-service";
import { IRequestAuth } from "../types/express";

class FileController {
  async getAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      res.sendFile(path.resolve(`./upload/avatars/${file}`));
    } catch (e) {
      next(e);
    }
  }

  async createFile(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const owner = req.user.id;
      const href = uuid() + ".test";
      const { name, folder } = req.headers;

      if (typeof name !== "string") {
        throw ApiError.BadRequest("You should specify a file name");
      }

      if (typeof folder === "object") {
        throw ApiError.BadRequest("You should specify a folder id correctly");
      }
      const newFile = await fileService.createFileSignature(
        name,
        href,
        folder,
        owner
      );
      res.json(newFile).status(201);
    } catch (e) {
      next(e);
    }
  }
}

export default new FileController();
