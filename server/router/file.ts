import express from "express";
import fileController from "../controllers/file-controller";
import authMiddleware from "../middlewares/auth-middleware";
import confirmMailMiddleware from "../middlewares/confirm-mail-middleware";
import { fileUpload } from "../middlewares/multer-middleware";

export const fileRouter = express.Router();

fileRouter.get("/avatar/:file", fileController.getAvatar);
fileRouter.get("/download/:file", fileController.downloadFile);
fileRouter.get(
  "/download-protected/:id",
  authMiddleware,
  fileController.downloadFileProtected
);
fileRouter.post(
  "/upload",
  authMiddleware,
  fileUpload.single("file"),
  fileController.createFile
);
fileRouter.put(
  "/set-public/:file",
  authMiddleware,
  confirmMailMiddleware,
  fileController.setPublic
);
fileRouter.put("/set-folder/:file", authMiddleware, fileController.setFolder);
fileRouter.delete("/:file", authMiddleware, fileController.moveToTrash);
