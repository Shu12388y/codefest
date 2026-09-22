import type { Context } from "hono";
import { BlogRepo } from "../repo/blog.repo.js";
import { DB_CONNECT } from "../../../../database/db.js";
import { ENV } from "../../../../env/env.js";

export class BlogController {
  static async findAll(c: Context) {
    try {
      await DB_CONNECT(ENV.DB_URI);
      const response = await BlogRepo.findAll();

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
      await DB_CONNECT(ENV.DB_URI);
      const title = c.req.param("title") || c.req.query("title");

      if (!title) {
        c.status(400);
        return c.json({ message: "Blog title is required" });
      }

      const response = await BlogRepo.find(title);

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
