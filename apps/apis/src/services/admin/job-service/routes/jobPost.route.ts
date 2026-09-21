import { Hono } from "hono";
import { JobPostController } from "../controllers/jobPost.controller.js";

export const jobPostRouter = new Hono();

jobPostRouter.get("/jobs", JobPostController.findAll);
jobPostRouter.get("/job/:title", JobPostController.find);
jobPostRouter.post("/job", JobPostController.create);
jobPostRouter.patch("/job/:id", JobPostController.update);
jobPostRouter.delete("/job/:id", JobPostController.delete);
