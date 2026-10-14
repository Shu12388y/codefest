import { Hono } from "hono";
import { JudgeController } from "../controller/judge.controller.js";

export const judgeRouter = new Hono();

judgeRouter.post("/submit",JudgeController.submit);
judgeRouter.get("/result",JudgeController.result);