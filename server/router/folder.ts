import express from "express";
import authMiddleware from "../middlewares/auth-middleware";
import { fileRouter } from "./file";

export const folderRouter = express.Router();
fileRouter.post("/", authMiddleware);
