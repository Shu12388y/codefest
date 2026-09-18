import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = new Hono();

authRouter.post("/login",AuthController.login);
authRouter.post("/signup",AuthController.signup);