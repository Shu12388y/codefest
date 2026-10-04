import { Hono } from "hono";
import { SubmissionController } from "../controllers/submission.controller.js";

export const submissionRouter = new Hono();

submissionRouter.get("/submissions", SubmissionController.findAll);