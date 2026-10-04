import { OpenRouterConfig } from "../../../../utils/open-router/openRouter.js";
import { ENV } from "../../../../env/env.js";
import { prompts } from "../prompts/prompts.js";
import type { Context } from "hono";

const openRouterInstance = new OpenRouterConfig(
  ENV.OPEN_ROUTER_MODEL,
  ENV.OPEN_ROUTER_TOKEN,
);

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
      const response = await openRouterInstance.API(_prompt);
      c.status(200);
      return c.json({
        message: "success",
        data: response?.output[1]?.content[0]?.text,
      });
    } catch (error) {
      c.status(500)
      return c.json({
        message:String(error)
      })
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

      const response = await openRouterInstance.API(
        prompts.hint(question, code, language),
      );
      const text = response?.output?.[1]?.content?.[0]?.text
        || response?.output?.[0]?.content?.[0]?.text;

      if (!text) {
        c.status(502);
        return c.json({ message: "The AI service returned no hint" });
      }

      const cleanText = text.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
      let hintData: { hint: string; improvedCode: string };
      try {
        hintData = JSON.parse(cleanText) as { hint: string; improvedCode: string };
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
