import { IRequestAuth } from "../types/express";
import { Response, NextFunction, Request } from "express";
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
      const folderId = req.params.id;
      const { id } = req.user;
      const folderData = await folderService.setPublic(folderId, id);
      res.json(folderData);
    } catch (e) {
      next(e);
    }
  }

  async moveToTrash(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const folderId = req.params.id;
      const { id } = req.user;
      const folderData = await folderService.moveToTrash(folderId, id);
      res.json(folderData);
    } catch (e) {
      next(e);
    }
  }

  async getAllPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = "0", limit = "100" } = req.query;
      const folders = await folderService.getAllPublic(
        parseInt(page?.toString()),
        parseInt(limit?.toString())
      );
      res.json(folders);
    } catch (e) {
      next(e);
    }
  }

  async getForUser(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const folders = await folderService.getForUser(id);
      res.json(folders);
    } catch (e) {
      next(e);
    }
  }

  async getTrashForUser(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const folders = await folderService.getTrashForUser(id);
      res.json(folders);
    } catch (e) {
      next(e);
    }
  }

  async getOnePublic(req: Request, res: Response, next: NextFunction) {
    try {
      const folderId = req.params.id;
      const folder = await folderService.getOnePublic(folderId);
      res.json(folder);
    } catch (e) {
      next(e);
    }
  }

  async getOnePrivate(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const folderId = req.params.id;
      const { id } = req.user;
      const folder = await folderService.getOnePrivate(folderId, id);
      res.json(folder);
    } catch (e) {
      next(e);
    }
  }
}

export default new FolderController();
