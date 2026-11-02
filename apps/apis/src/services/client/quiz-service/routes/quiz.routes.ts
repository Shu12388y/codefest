import { Hono } from "hono";
import { QuizController } from "../controllers/quiz.controller.js";

export const quizRouter = new Hono();

quizRouter.post("/quiz/question", QuizController.generateQuestion);
