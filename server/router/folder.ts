import express from "express";
import folderController from "../controllers/folder-controller";
import authMiddleware from "../middlewares/auth-middleware";

export const folderRouter = express.Router();
folderRouter.post("/", authMiddleware, folderController.createFolder);
folderRouter.put(
  "/set-public/:folder",
  authMiddleware,
  folderController.setPublic
);
