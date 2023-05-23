import express from "express";
import { body } from "express-validator";
import folderController from "../controllers/folder-controller";
import authMiddleware from "../middlewares/auth-middleware";

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
  folderController.setPublic
);
