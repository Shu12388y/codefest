import { Hono } from "hono";
import { AnalysisController } from "../controller/analysis.controller.js";

export const analysisRouter = new Hono();

analysisRouter.get("/analysis", AnalysisController.overview);
