import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type QuizQuestion = {
  question: string;
  options: { a: string; b: string; c: string; d: string };
  correctOption: "a" | "b" | "c" | "d";
};

type QuizState = {
  open: boolean;
  topic: string;
  subtopic: string;
  generationId: string | null;
  generationLoading: boolean;
  generationError: string | null;
  questions: QuizQuestion[];
  currentQuestion: number;
  selectedOption: string | null;
  answers: Record<number, string>;
  score: number | null;
  questionsLoading: boolean;
  questionsError: string | null;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const initialState: QuizState = {
  open: false,
  topic: "",
  subtopic: "",
  generationId: null,
  generationLoading: false,
  generationError: null,
  questions: [],
  currentQuestion: 0,
  selectedOption: null,
  answers: {},
  score: null,
  questionsLoading: false,
  questionsError: null,
};

type GenerationResponse = { data?: string; message?: string };
type QuestionsResponse = { data?: QuizQuestion[]; pending?: boolean; message?: string };

export const generateQuiz = createAsyncThunk(
  "quiz/generate",
  async (
    { topic, subtopic }: { topic: string; subtopic: string },
    { signal },
  ) => {
    const response = await fetch(`${API_URL}/api/v1/quiz/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, subtopic }),
      signal,
    });
    const result = (await response.json()) as GenerationResponse;
    if (!response.ok || !result.data) {
      throw new Error(result.message || "Unable to start quiz generation");
    }
    return result.data;
  },
);

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const loadQuizQuestions = createAsyncThunk(
  "quiz/loadQuestions",
  async (id: string) => {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      const response = await fetch(`${API_URL}/api/v1/quiz/question/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      const result = (await response.json()) as QuestionsResponse;
      if (result.pending || response.status === 202) {
        await wait(2000);
        continue;
      }
      if (!response.ok || !result.data?.length) {
        throw new Error(result.message || "Unable to load quiz questions");
      }
      return result.data;
    }
    throw new Error("Question generation timed out");
  },
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    openQuiz: (state, action: PayloadAction<{ topic: string; subtopic: string }>) => {
      state.open = true;
      state.topic = action.payload.topic;
      state.subtopic = action.payload.subtopic;
      state.generationId = null;
      state.generationError = null;
      state.generationLoading = false;
    },
    closeQuiz: (state) => {
      state.open = false;
    },
    setSubtopic: (state, action: PayloadAction<string>) => {
      state.subtopic = action.payload;
      state.generationId = null;
      state.generationError = null;
    },
    selectOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
      state.answers[state.currentQuestion] = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion += 1;
        state.selectedOption = state.answers[state.currentQuestion] ?? null;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
        state.selectedOption = state.answers[state.currentQuestion] ?? null;
      }
    },
    finishQuiz: (state) => {
      if (!state.selectedOption) return;
      state.score = state.questions.reduce(
        (total, question, index) =>
          total + (state.answers[index] === question.correctOption ? 1 : 0),
        0,
      );
    },
    resetProgress: (state) => {
      state.currentQuestion = 0;
      state.selectedOption = null;
      state.answers = {};
      state.score = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateQuiz.pending, (state) => {
        state.generationLoading = true;
        state.generationError = null;
      })
      .addCase(generateQuiz.fulfilled, (state, action) => {
        state.generationLoading = false;
        state.generationId = action.payload;
      })
      .addCase(generateQuiz.rejected, (state, action) => {
        state.generationLoading = false;
        state.generationError = action.error.message || "Unable to start quiz generation";
      })
      .addCase(loadQuizQuestions.pending, (state) => {
        state.questionsLoading = true;
        state.questionsError = null;
        state.questions = [];
        state.score = null;
        state.currentQuestion = 0;
        state.selectedOption = null;
        state.answers = {};
      })
      .addCase(loadQuizQuestions.fulfilled, (state, action) => {
        state.questionsLoading = false;
        state.questions = action.payload;
      })
      .addCase(loadQuizQuestions.rejected, (state, action) => {
        state.questionsLoading = false;
        state.questionsError = action.error.message || "Unable to load quiz questions";
      });
  },
});

export const {
  openQuiz,
  closeQuiz,
  setSubtopic,
  selectOption,
  nextQuestion,
  previousQuestion,
  finishQuiz,
  resetProgress,
} = quizSlice.actions;
export default quizSlice.reducer;
