import { Hono } from "hono";
import { JudgeController } from "../controller/judge.controller.js";

export const judgeRouter = new Hono();

judgeRouter.post("/",JudgeController.submit);
judgeRouter.get("/",JudgeController.result);
