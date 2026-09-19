import type { Context } from "hono";
import { DSAQuestionRepo } from "../repos/dsaQuestion.repo.js";

export class DSAQuestionController {
	static async create(c: Context) {
		try {
			const data = await c.req.json();
			const {
				title,
				description,
				tags = "",
				testInput,
				testOutput,
				judgeInput,
				judgeOutput,
			} = data;

			if (
				!title ||
				!description ||
				!testInput ||
				!testOutput ||
				!judgeInput ||
				!judgeOutput
			) {
				c.status(400);
				return c.json({ message: "All required fields are required" });
			}

			const question = new DSAQuestionRepo(
				title,
				description,
				tags,
				testInput,
				testOutput,
				judgeInput,
				judgeOutput,
			);
			const response = await question.create();

			if (response.statusCode === -1) {
				c.status(500);
				return c.json({ message: response.message });
			}

			c.status(201);
			return c.json({ message: response.message, data: response.data });
		} catch (error) {
			console.log(error);
			c.status(500);
			return c.json({ message: "Internal server error" });
		}
	}

	static async findAll(c: Context) {
		try {
			const response = await DSAQuestionRepo.findAll();

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

	static async find(c: Context) {
		try {
			const title = c.req.param("id") || c.req.query("title");

			if (!title) {
				c.status(400);
				return c.json({ message: "Question id or title is required" });
			}

			const response = await DSAQuestionRepo.find(title);

			if (response.statusCode === -1) {
				c.status(
					response.message === "DSA question not exists" ? 404 : 500,
				);
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

	static async update(c: Context) {
		try {
			const data = await c.req.json();
			const id = c.req.param("id") || data.id || c.req.query("id");
			const {
				title,
				description,
				tags = "",
				testInput,
				testOutput,
				judgeInput,
				judgeOutput,
			} = data;

			if (
				!id ||
				!title ||
				!description ||
				!testInput ||
				!testOutput ||
				!judgeInput ||
				!judgeOutput
			) {
				c.status(400);
				return c.json({ message: "All required fields are required" });
			}

			const question = new DSAQuestionRepo(
				title,
				description,
				tags,
				testInput,
				testOutput,
				judgeInput,
				judgeOutput,
			);
			const response = await question.update(id);

			if (response.statusCode === -1) {
				c.status(
					response.message === "DSA question not exists" ? 404 : 500,
				);
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

	static async delete(c: Context) {
		try {
			const id = c.req.param("id") || c.req.query("id");

			if (!id) {
				c.status(400);
				return c.json({ message: "Question id is required" });
			}

			const response = await DSAQuestionRepo.delete(id);

			if (response.statusCode === -1) {
				c.status(
					response.message === "DSA question not exists" ? 404 : 500,
				);
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