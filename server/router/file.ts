import express from "express";
import fileController from "../controllers/file-controller";
import authMiddleware from "../middlewares/auth-middleware";

export const fileRouter = express.Router();

fileRouter.get("/avatar/:file", fileController.getAvatar);
fileRouter.post("/folder", authMiddleware, fileController.createFolder);
fileRouter.post("/file", authMiddleware, fileController.createFile);
