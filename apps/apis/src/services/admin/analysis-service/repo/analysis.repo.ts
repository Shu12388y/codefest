import { Blogs } from "../../../../schema/blogs/blogs.model.js";
import { JobPost } from "../../../../schema/job-posts/jobPosts.model.js";
import { ENV } from "../../../../env/env.js";
import { ResponseHelper } from "../../../../helpers/Response.js";

type OpenRouterResponse = { data?: Record<string, unknown> };

const openRouterRequest = async (endpoint: string): Promise<Record<string, unknown>> => {
	const response = await fetch(`https://openrouter.ai/api/v1/${endpoint}`, {
		headers: { Authorization: `Bearer ${ENV.OPEN_ROUTER_TOKEN}` },
	});

	if (!response.ok) {
		throw new Error(`OpenRouter request failed with status ${response.status}`);
	}

	const result = await response.json() as OpenRouterResponse;
	return result.data ?? {};
};

export class AnalysisRepo {
	static async findOverview() {
		try {
			const [blogCount, jobCount, credits, key] = await Promise.all([
				Blogs.countDocuments(),
				JobPost.countDocuments(),
				openRouterRequest("credits"),
				openRouterRequest("key"),
			]);

			return new ResponseHelper(1, "Analysis found", {
				blogs: { total: blogCount },
				jobs: { total: jobCount },
				openRouter: { credits, key },
			}).response();
		} catch (error) {
			return new ResponseHelper(-1, String(error)).response();
		}
	}
}
