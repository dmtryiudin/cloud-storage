import express from "express";
import modController from "../controllers/mod-controller";
import authMiddleware from "../middlewares/auth-middleware";
import roleMiddleware from "../middlewares/role-middleware";
import { body } from "express-validator";
import confirmMailMiddleware from "../middlewares/confirm-mail-middleware";

export const modRouter = express.Router();

modRouter.put(
  "/ban/:login",
  body("reason").notEmpty().withMessage("Reason is required"),
  authMiddleware,
  roleMiddleware(["MOD"]),
  confirmMailMiddleware,
  modController.banUser
);
