import express from "express";
import { body } from "express-validator";
import folderController from "../controllers/folder-controller";
import authMiddleware from "../middlewares/auth-middleware";
import confirmMailMiddleware from "../middlewares/confirm-mail-middleware";

export const folderRouter = express.Router();
folderRouter.post(
  "/",
  body("name").notEmpty().withMessage("Folder name is required"),
  authMiddleware,
  folderController.createFolder
);
folderRouter.put(
  "/set-public/:folder",
  authMiddleware,
  confirmMailMiddleware,
  folderController.setPublic
);
folderRouter.delete("/:folder", authMiddleware, folderController.moveToTrash);
