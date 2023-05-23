import { IRequestAuth } from "../types/express";
import { Response, NextFunction } from "express";
import folderService from "../service/folder-service";

class FolderController {
  async createFolder(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const owner = req.user.id;
      const newFolder = await folderService.createFolderSignature(owner, name);
      res.json(newFolder).status(201);
    } catch (e) {
      next(e);
    }
  }
}

export default new FolderController();
