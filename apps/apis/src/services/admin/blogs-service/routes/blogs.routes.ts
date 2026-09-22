import { Hono } from "hono";
import { BlogsController } from "../controllers/blogs.controller.js";
import {uploaderMiddleware} from "../../../../middlewares/admin/upload-middleware/upload-middleware.js";
export const blogsRouter = new Hono();

blogsRouter.get("/blogs", BlogsController.findAll);
blogsRouter.get("/blog/:title", BlogsController.find);
blogsRouter.post("/blog",uploaderMiddleware.upload, BlogsController.create);
blogsRouter.patch("/blog/:id", uploaderMiddleware.upload, BlogsController.update);
blogsRouter.delete("/blog/:id", BlogsController.delete);
