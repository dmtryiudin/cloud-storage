import express from "express";
import { body } from "express-validator";
import settingsController from "../controllers/settings-controller";
import authMiddleware from "../middlewares/auth-middleware";

export const settingsRouter = express.Router();
settingsRouter.get("/", authMiddleware, settingsController.getForUser);
settingsRouter.put(
  "/",
  authMiddleware,
  body("tableFiles")
    .optional()
    .isBoolean()
    .withMessage("tableFiles should be boolean"),
  settingsController.updateForUser
);
