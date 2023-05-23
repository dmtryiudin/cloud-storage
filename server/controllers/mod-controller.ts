import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import modService from "../service/mod-service";

class ModController {
  async banUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { login } = req.params;
      const { reason } = req.body;
      const user = await modService.banUser(login, reason);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}
export default new ModController();
