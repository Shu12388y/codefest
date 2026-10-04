import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAiHint } from "@/lib/aiHint";

export type WorkspaceLanguage = "JavaScript" | "TypeScript" | "Python" | "Java";
export type WorkspaceResult = "idle" | "running" | "success" | "error";

export type WorkspaceState = {
  questionId: string | null;
  code: string;
  language: WorkspaceLanguage;
  result: WorkspaceResult;
  output: string;
  submitted: boolean;
  hint: string | null;
  improvedCode: string | null;
  hintLoading: boolean;
  hintError: string | null;
};

const boilerplates: Record<WorkspaceLanguage, string> = {
  JavaScript: "function solution(input) {\n  // Write your solution here\n}\n",
  TypeScript: "function solution(input: string): string {\n  // Write your solution here\n  return input;\n}\n",
  Python: "def solution(input):\n    # Write your solution here\n    pass\n",
  Java: "class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}\n",
};

const defaultCode = boilerplates.JavaScript;

const initialState: WorkspaceState = {
  questionId: null,
  code: defaultCode,
  language: "JavaScript",
  result: "idle",
  output: "Run your solution against the sample test case.",
  submitted: false,
  hint: null,
  improvedCode: null,
  hintLoading: false,
  hintError: null,
};

export const requestHint = createAsyncThunk(
  "workspace/requestHint",
  async ({ question, code, language }: { question: string; code: string; language: WorkspaceLanguage }) =>
    fetchAiHint({ question, code, language }),
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    initializeWorkspace: (state, action: PayloadAction<string>) => {
      if (state.questionId === action.payload) return;
      state.questionId = action.payload;
      state.code = defaultCode;
      state.language = "JavaScript";
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
      state.hint = null;
      state.improvedCode = null;
      state.hintError = null;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
      state.improvedCode = null;
    },
    setLanguage: (state, action: PayloadAction<WorkspaceLanguage>) => {
      state.language = action.payload;
      state.code = boilerplates[action.payload];
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
      state.improvedCode = null;
    },
    resetCode: (state) => {
      state.code = boilerplates[state.language];
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
    },
    runCode: (state) => {
      state.result = "success";
      state.output = `Sample test passed for ${state.language}.`;
      state.submitted = false;
    },
    submitCode: (state) => {
      state.result = "success";
      state.output = `Submission accepted for ${state.language}.`;
      state.submitted = true;
    },
    applyImprovedCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
      state.improvedCode = null;
      state.result = "idle";
      state.output = "Improved code applied. Run it to check the sample test case.";
      state.submitted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestHint.pending, (state) => {
        state.hintLoading = true;
        state.hintError = null;
      })
      .addCase(requestHint.fulfilled, (state, action) => {
        state.hintLoading = false;
        state.hint = action.payload.hint;
        state.improvedCode = action.payload.improvedCode;
      })
      .addCase(requestHint.rejected, (state, action) => {
        state.hintLoading = false;
        state.hintError = action.error.message || "Unable to generate a hint.";
      });
  },
});

export const {
  initializeWorkspace,
  setCode,
  setLanguage,
  resetCode,
  runCode,
  submitCode,
  applyImprovedCode,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
