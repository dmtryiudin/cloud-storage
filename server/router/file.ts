import express from "express";
import fileController from "../controllers/file-controller";

export const fileRouter = express.Router();

fileRouter.get("/avatar/:file", fileController.getAvatar);
