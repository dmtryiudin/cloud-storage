import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
import userModel from "../models/user-model";
import { IRequestAuth } from "../types/express";

export default function (roles: string[]) {
  return async (req: IRequestAuth, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const user = await userModel.findById(id);

      const userRoles = user!.roles;
      for (let userRole of userRoles) {
        if (roles.indexOf(userRole) >= 0) {
          return next();
        }
      }

      next(
        ApiError.Forbidden(
          `You don't have a suitable role. Allowed roles: ${roles.join(", ")}`
        )
      );
    } catch (e) {
      return next(
        ApiError.Forbidden(
          `You don't have a suitable role. Allowed roles: ${roles.join(", ")}`
        )
      );
    }
  };
}
