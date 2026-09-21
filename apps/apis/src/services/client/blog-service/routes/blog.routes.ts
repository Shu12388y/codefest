import { Hono } from "hono";
import { BlogController } from "../controllers/blog.controller.js";

export const clientBlogRouter = new Hono();

clientBlogRouter.get("/blogs", BlogController.findAll);
clientBlogRouter.get("/blog/:title", BlogController.find);
