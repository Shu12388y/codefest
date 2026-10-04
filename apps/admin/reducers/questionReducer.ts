import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createQuestion,
  deleteQuestion,
  question as getQuestion,
  questions as getQuestions,
  updateQuestion,
  type QuestionPayload,
} from "../handlers/handler";

export type Question = QuestionPayload & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

type QuestionState = {
  items: Question[];
  draft: QuestionPayload;
  created: Question | null;
  loading: boolean;
  error: string | null;
};

const emptyQuestion: QuestionPayload = {
  title: "",
  description: "",
  tags: "",
  testInput: "",
  testOutput: "",
  judgeInput: "",
  judgeOutput: "",
};

const initialState: QuestionState = {
  items: [],
  draft: emptyQuestion,
  created: null,
  loading: false,
  error: null,
};

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const addQuestion = createAsyncThunk(
  "questions/create",
  async (payload: QuestionPayload) => {
    const response = await createQuestion(payload);
    return response.data as Question;
  },
);

export const fetchQuestions = createAsyncThunk("questions/fetchAll", async () => {
  const response = await getQuestions();
  return (response.data || []) as Question[];
});

export const loadQuestion = createAsyncThunk("questions/fetchOne", async (id: string) => {
  const response = await getQuestion(id);
  return response.data as Question;
});

export const editQuestion = createAsyncThunk(
  "questions/update",
  async (payload: QuestionPayload & { id: string }) => {
    const response = await updateQuestion(payload);
    return response.data as Question;
  },
);

export const removeQuestion = createAsyncThunk("questions/delete", async (id: string) => {
  await deleteQuestion(id);
  return id;
});

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionDraft: (state, action: PayloadAction<Partial<QuestionPayload>>) => {
      Object.assign(state.draft, action.payload);
    },
    clearQuestionError: (state) => {
      state.error = null;
    },
    resetQuestionDraft: (state) => {
      state.draft = { ...emptyQuestion };
      state.created = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.created = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.created = action.payload;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = errorMessage(action.error);
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = errorMessage(action.error);
      })
      .addCase(loadQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.created = null;
      })
      .addCase(loadQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.draft = action.payload;
      })
      .addCase(loadQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = errorMessage(action.error);
      })
      .addCase(editQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((question) =>
          question._id === action.payload._id ? action.payload : question,
        );
        state.draft = action.payload;
        state.created = action.payload;
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = errorMessage(action.error);
      })
      .addCase(removeQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((question) => question._id !== action.payload);
      })
      .addCase(removeQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = errorMessage(action.error);
      });
  },
});

export const { setQuestionDraft, clearQuestionError, resetQuestionDraft } =
  questionSlice.actions;
export default questionSlice.reducer;