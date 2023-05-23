import { NextFunction, Request, Response } from "express";
import path from "path";
import { uuid } from "uuidv4";
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

  async createFolder(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const owner = req.user.id;
      const newFolder = await fileService.createFolderSignature(owner, name);
      res.json(newFolder).status(201);
    } catch (e) {
      next(e);
    }
  }

  async createFile(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const owner = req.user.id;
      const href = uuid() + ".test";
      const { name, folder } = req.body;
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
