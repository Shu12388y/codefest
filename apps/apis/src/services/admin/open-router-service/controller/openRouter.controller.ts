import { ENV } from "../../../../env/env.js";
import { prompts } from "../prompts/prompts.js";
import type { Context } from "hono";
import { AISDK } from "@repo/ai-sdk/ai";

const AIInstance = new AISDK(ENV.MODEL, ENV.GOOGLE_API_KEY);

export class openRouterController {
  static async call(c: Context) {
    try {
      const data = await c.req.json();
      const { ip } = data;
      if (!ip) {
        c.status(403);
        return c.json({ message: "Input is required" });
      }
      const _prompt = prompts.question(ip);
      const response = await AIInstance.interact({
        model: ENV.GOOGLE_MODEL,
        input: _prompt,
      });
      c.status(200);
      return c.json({
        message: "success",
        data:
          typeof response === "object" && response !== null
            ? response?.output_text
            : undefined,
      });
    } catch (error) {
      c.status(500);
      return c.json({
        message: String(error),
      });
    }
  }

  static async hint(c: Context) {
    try {
      const data = await c.req.json();
      const { question, code, language } = data;
      if (!question || !code || !language) {
        c.status(400);
        return c.json({ message: "Question, code and language are required" });
      }

      const response = await AIInstance.interact({
         model: ENV.GOOGLE_MODEL,
        input: prompts.hint(question, code, language),
        
      })
      const text = typeof response === "object" && response !== null
            ? response?.output_text
            : undefined

      if (!text) {
        c.status(502);
        return c.json({ message: "The AI service returned no hint" });
      }

      const cleanText = text
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
      let hintData: { hint: string; improvedCode: string };
      try {
        hintData = JSON.parse(cleanText) as {
          hint: string;
          improvedCode: string;
        };
      } catch {
        hintData = { hint: cleanText, improvedCode: code };
      }

      c.status(200);
      return c.json({ message: "success", data: hintData });
    } catch (error) {
      c.status(500);
      return c.json({ message: String(error) });
    }
  }
}
