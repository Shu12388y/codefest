import { BlogsRepo } from "../repos/blogs.repo.js";
import type { Context } from "hono";

export class BlogsController {
  static async create(c: Context) {
    try {
      const requestWithFormData = c.req as typeof c.req & {
        parsedFormData?: FormData;
      };
      const data = requestWithFormData.parsedFormData ?? await c.req.raw.formData();
      const title = data.get('title') as string;
      const body = data.get('body') as string;
      const author = data.get('author') as string;
      const metatags =  data.get('metatags') as string;
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
      const contentType = c.req.header("content-type") || "";
      const requestWithFormData = c.req as typeof c.req & {
        parsedFormData?: FormData;
        thumbnailUrl?: string;
      };
      const data = contentType.includes("multipart/form-data")
        ? requestWithFormData.parsedFormData ?? await c.req.raw.formData()
        : await c.req.json();
      const id = c.req.param("id") || data.id || c.req.query("id");
      const title = data.get ? data.get("title") : data.title;
      const body = data.get ? data.get("body") : data.body;
      const author = data.get ? data.get("author") : data.author;
      const metatags = data.get ? data.get("metatags") : data.metatags;
      const thumbnail = requestWithFormData.thumbnailUrl || (data.get ? data.get("thumbnail") : data.thumbnail);

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
