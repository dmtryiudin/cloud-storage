import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import settingsService from "../service/settings-service";
import { IRequestAuth } from "../types/express";

class SettingsController {
  async getForUser(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const settings = await settingsService.getForUser(id);
      res.json(settings);
    } catch (e) {
      next(e);
    }
  }

  async updateForUser(req: IRequestAuth, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { id } = req.user;
      const { tableFiles } = req.body;
      const settings = await settingsService.updateForUser(id, tableFiles);

      res.json(settings);
    } catch (e) {
      next(e);
    }
  }
}

export default new SettingsController();
