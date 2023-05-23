import express from "express";
import userController from "../controllers/user-controller";
import authMiddleware from "../middlewares/auth-middleware";
import { upload } from "../middlewares/multer-middleware";

export const usersRouter = express.Router();

usersRouter.get("/", userController.getAll);
usersRouter.get("/:login", userController.getOne);
usersRouter.put("/", authMiddleware, userController.updateOne);
usersRouter.delete("/", authMiddleware, userController.deleteOne);
usersRouter.put(
  "/avatar",
  upload.single("avatar"),
  authMiddleware,
  userController.updateAvatar
);
