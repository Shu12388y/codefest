import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, toolStrategy } from "langchain";
import { z } from "zod";
import { sleep } from "../utils/sleep/sleep.js";

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
  question: questionSchema,
});

export const quizQuestionSchema = quizQuestionResponseSchema.shape.question;

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export type QuizQuestionInput = {
  topic: string;
  subtopic: string;
};

export type QuizQuestionBatchInput = QuizQuestionInput & {
  count: number;
};

const quizQuestionInputSchema = z.object({
  topic: z.string().trim().min(1),
  subtopic: z.string().trim().min(1),
});

const quizQuestionBatchInputSchema = quizQuestionInputSchema.extend({
  count: z.number().int().min(1).max(50),
});

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
      "You create one accurate multiple-choice quiz question with four distinct options. " +
      "The correctOption must identify the option containing the correct answer. Do not include an answer explanation.",
  });
}

async function invokeQuizQuestion(
  agent: ReturnType<typeof createQuizQuestionAgent>,
  request: QuizQuestionInput,
  questionNumber?: number,
  previousQuestions: string[] = [],
): Promise<QuizQuestion> {
  const previousQuestionsPrompt =
    previousQuestions.length > 0
      ? ` Do not repeat or rephrase any of these questions: ${previousQuestions
          .map((question) => `"${question}"`)
          .join(", ")}.`
      : "";

  const result = await agent.invoke({
    messages: [
      {
        role: "user",
        content:
          `Create a unique quiz question number ${questionNumber ?? 1} about the topic "${request.topic}" and subtopic "${request.subtopic}".` +
          " Test a different concept, fact, or scenario from any other question." +
          previousQuestionsPrompt,
      },
    ],
  });
  return quizQuestionSchema.parse(result.structuredResponse.question);
}

export async function generateQuizQuestion(
  input: QuizQuestionInput,
): Promise<QuizQuestion> {
  const request = quizQuestionInputSchema.parse(input);

  return invokeQuizQuestion(createQuizQuestionAgent(), request);
}

export async function generateQuizQuestions(
  input: QuizQuestionBatchInput,
): Promise<QuizQuestion[]> {
  const request = quizQuestionBatchInputSchema.parse(input);
  const agent = createQuizQuestionAgent();
  const questions: QuizQuestion[] = [];
  const questionKeys = new Set<string>();
  const maxAttemptsPerQuestion = 3;

  for (let index = 0; index < request.count; index += 1) {
    let question: QuizQuestion | undefined;

    for (let attempt = 0; attempt < maxAttemptsPerQuestion; attempt += 1) {
      const candidate = await invokeQuizQuestion(
        agent,
        request,
        index + 1,
        questions.map((item) => item.question),
      );
      const questionKey = candidate.question.trim().toLowerCase();

      if (!questionKeys.has(questionKey)) {
        question = candidate;
        questionKeys.add(questionKey);
        break;
      }
    }

    if (!question) {
      throw new Error(
        `Unable to generate a unique question for batch item ${index + 1}`,
      );
    }

    questions.push(question);
  }

  return questions;
}
