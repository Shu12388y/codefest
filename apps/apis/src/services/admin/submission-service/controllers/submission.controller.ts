import type { Context } from "hono";
import { DB_CONNECT } from "../../../../database/db.js";
import { ENV } from "../../../../env/env.js";
import { SubmissionRepo } from "../repos/submission.repo.js";

export class SubmissionController {
  static async findAll(c: Context) {
    try {
      await DB_CONNECT(ENV.DB_URI);
      const response = await SubmissionRepo.findAll();

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
}