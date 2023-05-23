import { NextFunction, Request, Response } from "express";
import userService from "../service/user-service";
import authService from "../service/auth-service";
import { ApiError } from "../exceptions/api-error";
import { IRequestAuth } from "../types/express";
import { unlink } from "fs";
import path from "path";
import fileService from "../service/file-service";
import folderService from "../service/folder-service";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = "0", limit = "100" } = req.query;
      const users = await userService.getAll(
        parseInt(page?.toString()),
        parseInt(limit?.toString())
      );
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { login } = req.params;
      const user = await userService.getOne(login);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateOne(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { name, country } = req.body;

      const user = await userService.updateOne(id, name, country);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      await userService.deleteOne(id);
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      await fileService.deleteAllForUser(id);
      await folderService.deleteAllForUser(id);
      return res.json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }

  async updateAvatar(req: IRequestAuth, res: Response, next: NextFunction) {
    const fileName = req.file?.filename;
    try {
      const { id } = req.user;
      if (!fileName) {
        throw ApiError.BadRequest("No image");
      }
      const user = await userService.updateAvatar(id, fileName);
      return res.json(user);
    } catch (e) {
      unlink(path.resolve(`./upload/avatar/${fileName}`), (err) => {
        if (err) return null;
      });
      next(e);
    }
  }
}

export default new UserController();
