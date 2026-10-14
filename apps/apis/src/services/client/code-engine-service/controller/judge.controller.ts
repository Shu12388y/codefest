import type { Context } from "hono";
import { DB_CONNECT } from "../../../../database/db.js";
import { ENV } from "../../../../env/env.js";
import { LANGUAGE_ID } from "../../../../helpers/LanguageCode.js";
import { OnlineCodeJudgeRepo } from "../repo/judge.repo.js";
import {inngest} from "../../../../utils/inngest/inngest.js";

export class JudgeController {
  static async submit(c: Context) {
    try {
      await DB_CONNECT(ENV.DB_URI);
      const data = await c.req.json();
      const { code, language_id, userId,type,question_id } = data;
      const languageId = Number(language_id);
      const language = Number.isInteger(languageId)
        ? LANGUAGE_ID[languageId as keyof typeof LANGUAGE_ID]
        : undefined;

      if (!userId || typeof userId !== "string") {
        c.status(400);
        return c.json({ message: "userId is required" });
      }

      if (!code || typeof code !== "string") {
        c.status(400);
        return c.json({ message: "code is required" });
      }

      if (!language) {
        c.status(400);
        return c.json({ message: "A supported language_id is required" });
      }

       const response = await OnlineCodeJudgeRepo.create({
        userId,
        code,
        questionId:question_id,
        language: String(language),
        submissionType:type,
        status: "QUEUE",
      });

      await inngest.send({
        name:'event/code.submission',
        data:{
          code:code,
          language_id:language,
          userId:userId,
          submission_id:response.data._id,
          type:type,
          question_id
        }
      })

      if (response.statusCode === -1) {
        c.status(500);
        return c.json({ message: response.message });
      }
      c.status(201);
      return c.json({ message: response.message, data: response.data?._id });
    } catch (error) {
      console.log(error);
      c.status(500);
      return c.json({ message: "Internal server error" });
    }
  }

  static async result(c: Context) {
    try {
      await DB_CONNECT(ENV.DB_URI);

      const submissionId =
        c.req.param("submissionId") || c.req.query("submissionId");

      if (!submissionId) {
        c.status(400);
        return c.json({ message: "submissionId is required" });
      }

      const response = await OnlineCodeJudgeRepo.find(submissionId);

      if (response.statusCode === -1) {
        c.status(
          response.message === "Submission not exists" ? 404 : 500,
        );
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