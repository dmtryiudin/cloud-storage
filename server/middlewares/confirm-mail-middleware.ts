import { Request, Response, NextFunction } from "express";
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
    const user = await userModel.findById(id);

    if (user!.isActivated) {
      return next();
    }
    return next(ApiError.Forbidden("User's mail is not activated"));
  } catch (e) {
    return next(ApiError.Forbidden("User's mail is not activated"));
  }
}
