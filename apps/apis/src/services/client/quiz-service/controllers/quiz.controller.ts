import type { Context } from "hono";
import {
  generateQuizQuestion,
  type QuizQuestionInput,
} from "../../../../agents/question.agent.js";
import { z } from "zod";

const quizQuestionInputSchema = z.object({
  topic: z.string().trim().min(1),
  subtopic: z.string().trim().min(1),
});

export class QuizController {
  static async generateQuestion(c: Context) {
    try {
      const body = await c.req.json<QuizQuestionInput>();
      const input = quizQuestionInputSchema.parse(body);
      const question = await generateQuizQuestion(input);

      c.status(200);
      return c.json({
        message: "Quiz question generated successfully",
        data: question,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        c.status(400);
        return c.json({
          message: "Topic and subtopic are required",
          errors: error.issues,
        });
      }

      console.error(error);
      c.status(500);
      return c.json({ message: "Unable to generate quiz question" });
    }
  }
}
