import { Hono } from "hono";
import { BlogsController } from "../controllers/blogs.controller.js";

export const blogsRouter = new Hono();

blogsRouter.get("/blogs", BlogsController.findAll);
blogsRouter.get("/blog/:title", BlogsController.find);
blogsRouter.post("/blog", BlogsController.create);
blogsRouter.patch("/blog/:id", BlogsController.update);
blogsRouter.delete("/blog/:id", BlogsController.delete);
