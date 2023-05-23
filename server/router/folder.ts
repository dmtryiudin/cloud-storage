import express from "express";
import folderController from "../controllers/folder-controller";
import authMiddleware from "../middlewares/auth-middleware";
import { fileRouter } from "./file";

export const folderRouter = express.Router();
fileRouter.post("/", authMiddleware, folderController.createFolder);
