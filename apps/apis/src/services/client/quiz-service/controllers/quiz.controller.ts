import type { Context } from "hono";
import {
  type QuizQuestionInput,
} from "../../../../agents/question.agent.js";
import { z } from "zod";
import {inngest} from "../../../../utils/inngest/inngest.js";
import { randomUUID } from "node:crypto";
import {clientRedis} from  "../../../../cache//redis.js";

const quizQuestionInputSchema = z.object({
  topic: z.string().trim().min(1),
  subtopic: z.string().trim().min(1),
});


export class QuizController {
  static async generateQuestion(c: Context) {
    try {
      const body = await c.req.json<QuizQuestionInput>();
      const input = quizQuestionInputSchema.parse(body);
      const NUMBER_OF_QUESTION = 10;
      const ID = randomUUID();
      await inngest.send({
        name:"event/question.generation",
        data:{
          topic:input.topic,
          subtopic:input.subtopic,
          count:NUMBER_OF_QUESTION,
          id:ID
        }
      })
      c.status(200);
      return c.json({
        message: "Quiz question generated successfully",
        data: ID,
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
  static async getQuestion(c:Context){
    try {
      const {id} = c.req.param() || c.req.json()  ;
      if(!id){
        c.status(403);
        return c.json({message:"ID is requried"})
      }
      const info = await clientRedis.get(id);
      if (!info) {
        c.status(202);
        return c.json({
          message: "Quiz questions are still being generated",
          pending: true,
        });
      }
      c.status(200)
      return c.json({message:"success",data:JSON.parse(info || "")})
    } catch (error) {
      console.log(error);
      c.status(500)
      return c.json({message:"Internal Server Error"})
    }
  }
}
