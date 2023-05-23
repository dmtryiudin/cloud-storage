import { IRequestAuth } from "../types/express";
import { Response, NextFunction } from "express";
import folderService from "../service/folder-service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";

class FolderController {
  async createFolder(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { name } = req.body;
      const owner = req.user.id;
      const newFolder = await folderService.createFolder(owner, name);
      res.json(newFolder).status(201);
    } catch (e) {
      next(e);
    }
  }

  async setPublic(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { folder } = req.params;
      const { id } = req.user;
      console.log(folder);
      const folderData = await folderService.setPublic(folder, id);
      res.json(folderData);
    } catch (e) {
      next(e);
    }
  }
}

export default new FolderController();
