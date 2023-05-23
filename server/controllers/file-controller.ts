import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { unlink } from "fs";
import path from "path";
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
    const fileSize = parseInt(req.headers["content-length"]!);
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
        owner,
        fileSize,
        folder
      );
      res.json(newFile).status(201);
    } catch (e) {
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

  async setPublic(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      const { id } = req.user;
      const fileData = await fileService.setPublic(file, id);
      res.json(fileData);
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

  async setFolder(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      const { id } = req.user;
      const { folder } = req.body;
      const fileData = await fileService.setFolder(file, id, folder);
      res.json(fileData);
    } catch (e) {
      next(e);
    }
  }

  async moveToTrash(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      const { id } = req.user;
      const fileData = await fileService.moveToTrash(file, id);
      res.json(fileData);
    } catch (e) {
      next(e);
    }
  }

  async getAllPublic(req: Request, res: Response, next: NextFunction) {
    try {
      let { page = "0", limit = "100", substr, extensions } = req.query;
      if (typeof extensions !== "string") {
        extensions = "";
      }

      if (typeof substr !== "string") {
        substr = "";
      }

      const files = await fileService.getAllPublic(
        parseInt(page?.toString()),
        parseInt(limit?.toString()),
        substr,
        extensions
      );
      res.json(files);
    } catch (e) {
      next(e);
    }
  }

  async getForUser(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      let { extensions } = req.query;
      if (typeof extensions !== "string") {
        extensions = "";
      }
      const files = await fileService.getForUser(id, extensions);
      res.json(files);
    } catch (e) {
      next(e);
    }
  }

  async getTrashForUser(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      let { extensions } = req.query;
      if (typeof extensions !== "string") {
        extensions = "";
      }
      const files = await fileService.getTrashForUser(id, extensions);
      res.json(files);
    } catch (e) {
      next(e);
    }
  }

  async rename(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { file } = req.params;
      const { id } = req.user;
      const { newName } = req.body;
      const fileData = await fileService.rename(id, file, newName);
      res.json(fileData);
    } catch (e) {
      next(e);
    }
  }
}

export default new FileController();
