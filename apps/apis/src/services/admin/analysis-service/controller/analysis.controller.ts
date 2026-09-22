import type { Context } from "hono";
import { AnalysisRepo } from "../repo/analysis.repo.js";
import { ENV } from "../../../../env/env.js";
import { DB_CONNECT } from "../../../../database/db.js";

export class AnalysisController {
	static async overview(c: Context) {
		try {
			await DB_CONNECT(ENV.DB_URI);
			const response = await AnalysisRepo.findOverview();

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
