import { Hono } from "hono";
import { DSAQuestionController } from "../controllers/dsaQuestion.controller.js";

export const dsaQuestionRouter = new Hono();

dsaQuestionRouter.get("/questions", DSAQuestionController.findAll);
dsaQuestionRouter.get("/question/:id",DSAQuestionController.find);
dsaQuestionRouter.post("/question",DSAQuestionController.create);
dsaQuestionRouter.patch("/question/:id", DSAQuestionController.update);
dsaQuestionRouter.delete("/question/:id", DSAQuestionController.delete);