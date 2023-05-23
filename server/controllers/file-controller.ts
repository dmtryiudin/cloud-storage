import { NextFunction, Request, Response } from "express";
import path from "path";

class FileController {
  async getAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req.params;
      res.sendFile(path.resolve(`./upload/avatars/${file}`));
    } catch (e) {
      next(e);
    }
  }
}

export default new FileController();
