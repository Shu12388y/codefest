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
        data: response?.data?.output[0]?.content[0]?.text,
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
