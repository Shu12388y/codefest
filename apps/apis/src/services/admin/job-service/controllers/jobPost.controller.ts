import type { Context } from "hono";
import { JobPostRepo } from "../repo/jobPost.repo.js";

export class JobPostController {
  static async create(c: Context) {
    try {
      const data = await c.req.json();
      const {
        title,
        role = "",
        tags = "",
        overview,
        selectionProcess,
        applicationProcess,
        organization,
        eligiblity = "",
        qualification = "",
        branch = "",
        experience = "",
        salary = "",
        location = "",
        applicationDate = "",
        applicationDeadline = "",
        interviewDate = "",
        applyLink = "",
      } = data;

      if (!title || !overview || !selectionProcess || !applicationProcess || !organization) {
        c.status(400);
        return c.json({ message: "Title, overview, selection process, application process and organization are required" });
      }

      const jobPost = new JobPostRepo(
        title,
        role,
        tags,
        overview,
        selectionProcess,
        applicationProcess,
        organization,
        eligiblity,
        qualification,
        branch,
        experience,
        salary,
        location,
        applicationDate,
        applicationDeadline,
        interviewDate,
        applyLink,
      );

      const response = await jobPost.create();

      if (response.statusCode === -1) {
        c.status(500);
        return c.json({ message: response.message });
      }

      c.status(201);
      return c.json({ message: response.message, data: response.data });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }

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

  static async update(c: Context) {
    try {
      const data = await c.req.json();
      const id = c.req.param("id") || data.id || c.req.query("id");
      const {
        title,
        role = "",
        tags = "",
        overview,
        selectionProcess,
        applicationProcess,
        organization,
        eligiblity = "",
        qualification = "",
        branch = "",
        experience = "",
        salary = "",
        location = "",
        applicationDate = "",
        applicationDeadline = "",
        interviewDate = "",
        applyLink = "",
      } = data;

      if (!id || !title || !overview || !selectionProcess || !applicationProcess || !organization) {
        c.status(400);
        return c.json({ message: "Id, title, overview, selection process, application process and organization are required" });
      }

      const jobPost = new JobPostRepo(
        title,
        role,
        tags,
        overview,
        selectionProcess,
        applicationProcess,
        organization,
        eligiblity,
        qualification,
        branch,
        experience,
        salary,
        location,
        applicationDate,
        applicationDeadline,
        interviewDate,
        applyLink,
      );

      const response = await jobPost.update(id);

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

  static async delete(c: Context) {
    try {
      const id = c.req.param("id") || c.req.query("id");

      if (!id) {
        c.status(400);
        return c.json({ message: "Job post id is required" });
      }

      const response = await JobPostRepo.delete(id);

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
