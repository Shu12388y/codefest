import { Hono } from "hono";
import { JobPostController } from "../controllers/jobPost.controller.js";

export const clientJobPostRouter = new Hono();

clientJobPostRouter.get("/jobs", JobPostController.findAll);
clientJobPostRouter.get("/job/:title", JobPostController.find);
