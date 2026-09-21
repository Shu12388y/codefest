import type { Context } from "hono";
import { JobPostRepo } from "../repo/jobPost.repo.js";

export class JobPostController {
  static async findAll(c: Context) {
    try {
      const response = await JobPostRepo.findAll();

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
        return c.json({ message: "Job title is required" });
      }

      const response = await JobPostRepo.find(title);

      if (response.statusCode === -1) {
        c.status(response.message === "Job post not exists" ? 404 : 500);
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
