import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, toolStrategy } from "langchain";
import { z } from "zod";

const optionSchema = z.object({
  a: z.string().min(1),
  b: z.string().min(1),
  c: z.string().min(1),
  d: z.string().min(1),
});

const questionSchema = z.object({
  question: z.string().min(1),
  options: optionSchema,
  correctOption: z.enum(["a", "b", "c", "d"]),
});

const quizQuestionResponseSchema = z.object({
  questions: z.array(questionSchema).length(10),
});

export const quizQuestionSchema = quizQuestionResponseSchema.shape.questions;

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export type QuizQuestionInput = {
  topic: string;
  subtopic: string;
};

function getModel() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is required to generate quiz questions");
  }

  return new ChatGoogleGenerativeAI({
    apiKey,
    model: process.env.GOOGLE_MODEL ?? "gemini-2.5-flash",
    temperature: 0.2,
  });
}

export function createQuizQuestionAgent() {
  return createAgent({
    name: "quiz-question-agent",
    model: getModel(),
    responseFormat: toolStrategy(quizQuestionResponseSchema),
    systemPrompt:
      "You create accurate multiple-choice quiz questions. Return exactly 10 questions, each with four distinct options. " +
      "The correctOption must identify the option containing the correct answer. Do not include an answer explanation.",
  });
}

export async function generateQuizQuestion(
  input: QuizQuestionInput,
): Promise<QuizQuestion> {
  const request = z
    .object({
      topic: z.string().trim().min(1),
      subtopic: z.string().trim().min(1),
    })
    .parse(input);

  const result = await createQuizQuestionAgent().invoke({
    messages: [
      {
        role: "user",
        content: `Create 10 quiz questions about the topic "${request.topic}" and subtopic "${request.subtopic}".`,
      },
    ],
  });

  return quizQuestionSchema.parse(result.structuredResponse.questions);
}
