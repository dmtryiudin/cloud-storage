import express from "express";
import userController from "../controllers/user-controller";
import multer from "multer";
import { uuid } from "uuidv4";
import path from "path";
import authMiddleware from "../middlewares/auth-middleware";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./upload/avatars"));
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
usersRouter.put("/:id", authMiddleware, userController.updateOne);
usersRouter.delete("/:id", authMiddleware, userController.deleteOne);
usersRouter.put(
  "/avatar/:id",
  upload.single("avatar"),
  authMiddleware,
  userController.updateAvatar
);
