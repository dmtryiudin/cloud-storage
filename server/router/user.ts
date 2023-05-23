import express from "express";
import userController from "../controllers/user-controller";
import multer from "multer";
import { uuid } from "uuidv4";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + ".png");
  },
});
const upload = multer({
  storage,
});
export const usersRouter = express.Router();

usersRouter.get("/", userController.getAll);
usersRouter.get("/:id", userController.getOne);
usersRouter.put("/:id", userController.updateOne);
usersRouter.delete("/:id", userController.deleteOne);
usersRouter.put(
  "/avatar/:id",
  upload.single("avatar"),
  userController.updateAvatar
);
