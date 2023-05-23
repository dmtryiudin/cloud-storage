import { Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
import userModel from "../models/user-model";
import { IRequestAuth } from "../types/express";

export default async function (
  req: IRequestAuth,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.user;
    const userData = await userModel.findById(id);
    if (userData?.isBanned) {
      return next(ApiError.Forbidden("User is banned"));
    }
    next();
  } catch (e) {
    return next(ApiError.Forbidden("User is banned"));
  }
}
