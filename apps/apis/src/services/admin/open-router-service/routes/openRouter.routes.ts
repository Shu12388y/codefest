import { Hono } from "hono";
import { openRouterController } from "../controller/openRouter.controller.js";

export const openRouterRoute = new Hono();

openRouterRoute.post("/call",openRouterController.call);