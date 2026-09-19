import { BlogsRepo } from "../repos/blogs.repo.js";
import type { Context } from "hono";

export class BlogsController {
  static async create(c: Context) {
    try {
      const data = await c.req.json();
      const { title, body, author, metatags } = data;
      // @ts-ignore
      const thumbnail = c.req?.thumbnailUrl;

      if (!title || !body || !author || !metatags || !thumbnail) {
        c.status(403);
        return c.json({ message: "All field are required" });
      }

      const blog = new BlogsRepo(title, body, thumbnail, author, metatags);
      await blog.create();

      c.status(201);
      return c.json({ message: "created" });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }

  static async findAll(c: Context) {
    try {
      const response = await BlogsRepo.findAll();
      if (response.statusCode === -1) {
        c.status(500);
        return c.json({ message: response.message });
      }

      c.status(200);
      return c.json({ message: response.message, data: response.data });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }

  static async find(c: Context) {
    try {
      const title = c.req.param("title") || c.req.query("title");

      if (!title) {
        c.status(400);
        return c.json({ message: "Blog title is required" });
      }

      const response = await BlogsRepo.find(title);
      if (response.statusCode === -1) {
        c.status(response.message === "Blog not exists" ? 404 : 500);
        return c.json({ message: response.message });
      }

      c.status(200);
      return c.json({ message: response.message, data: response.data });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }

  static async update(c: Context) {
    try {
      const data = await c.req.json();
      const id = c.req.param("id") || data.id || c.req.query("id");
      const { title, body, author, metatags, thumbnail } = data;

      if (!title || !body || !author || !metatags || !thumbnail) {
        c.status(400);
        return c.json({ message: "All fields are required" });
      }

      const blog = new BlogsRepo(title, body, thumbnail, author, metatags);
      const response = await blog.update(id);

      if (response.statusCode === -1) {
        c.status(response.message === "Blog not exists" ? 404 : 500);
        return c.json({ message: response.message });
      }

      c.status(200);
      return c.json({ message: response.message, data: response.data });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }

  static async delete(c: Context) {
    try {
      const id = c.req.param("id") || c.req.query("id");

      if (!id) {
        c.status(400);
        return c.json({ message: "Blog id is required" });
      }

      const response = await BlogsRepo.delete(id);

      if (response.statusCode === -1) {
        c.status(response.message === "Blog not exists" ? 404 : 500);
        return c.json({ message: response.message });
      }

      c.status(200);
      return c.json({ message: response.message, data: response.data });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }
}
