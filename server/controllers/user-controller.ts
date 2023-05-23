import { NextFunction, Request, Response } from "express";
import { UpdateUserDto } from "../dtos/update-user-dto";
import userService from "../service/user-service";
import authService from "../service/auth-service";
import { ApiError } from "../exceptions/api-error";
import { IRequestAuth } from "../types/express";

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
      if (!user) {
        throw ApiError.NotFound();
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async updateOne(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const userBody = { ...new UpdateUserDto(req.body) };

      const user = await userService.updateOne(id, userBody);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      await userService.deleteOne(id);
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }

  async updateAvatar(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const fileName = req.file?.filename;
      const { id } = req.user;
      if (!fileName) {
        throw ApiError.BadRequest("No image");
      }
      const user = await userService.updateAvatar(id, fileName);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
