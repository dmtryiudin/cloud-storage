import express from "express";
import { body } from "express-validator";
import folderController from "../controllers/folder-controller";
import authMiddleware from "../middlewares/auth-middleware";
import banMiddleware from "../middlewares/ban-middleware";
import confirmMailMiddleware from "../middlewares/confirm-mail-middleware";

export const folderRouter = express.Router();
folderRouter.post(
  "/",
  body("name").notEmpty().withMessage("Folder name is required"),
  authMiddleware,
  banMiddleware,
  folderController.createFolder
);
folderRouter.put(
  "/set-public/:id",
  authMiddleware,
  confirmMailMiddleware,
  folderController.setPublic
);
folderRouter.delete("/:id", authMiddleware, folderController.moveToTrash);
folderRouter.put(
  "/rename/:id",
  body("newName").notEmpty().withMessage("Folder name is required"),
  authMiddleware,
  banMiddleware,
  folderController.rename
);

folderRouter.get("/public/:id", folderController.getOnePublic);
folderRouter.get(
  "/private/:id",
  authMiddleware,
  folderController.getOnePrivate
);
folderRouter.get("/public", folderController.getAllPublic);
folderRouter.get("/user", authMiddleware, folderController.getForUser);
folderRouter.get("/trash", authMiddleware, folderController.getTrashForUser);
