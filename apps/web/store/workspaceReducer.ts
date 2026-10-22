import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAiHint } from "@/lib/aiHint";

export type WorkspaceLanguage = "JavaScript" | "TypeScript" | "Python" | "Java";
export type WorkspaceResult =
  | "idle"
  | "running"
  | "passed"
  | "failed"
  | "code-error"
  | "error";
export type SubmissionType = "test" | "submission";

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
  submissionLoading: boolean;
  submissionError: string | null;
  submissionStatus: string | null;
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
  submissionLoading: false,
  submissionError: null,
  submissionStatus: null,
};

export const requestHint = createAsyncThunk(
  "workspace/requestHint",
  async ({ question, code, language }: { question: string; code: string; language: WorkspaceLanguage }) =>
    fetchAiHint({ question, code, language }),
);

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const languageIds: Record<WorkspaceLanguage, number> = {
  JavaScript: 1,
  TypeScript: 1,
  Python: 5,
  Java: 4,
};

type SubmissionResponse = {
  message?: string;
  data?: string;
};

type ResultResponse = {
  message?: string;
  data?: {
    status?: string;
    stdout?: string;
    stderr?: string;
  };
};

type SubmissionOutcome = "passed" | "failed" | "code-error";

const getSubmissionOutcome = (
  status: string,
  stderr: string,
): SubmissionOutcome => {
  if (status === "Accepted") return "passed";
  if (
    status === "Compilation Error" ||
    status === "Runtime Error" ||
    status === "Runtime Error (NZEC)" ||
    status === "Time Limit Exceeded" ||
    Boolean(stderr)
  ) {
    return "code-error";
  }
  return "failed";
};

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const executeSubmission = createAsyncThunk(
  "workspace/executeSubmission",
  async ({
    code,
    language,
    questionId,
    userId,
    type,
  }: {
    code: string;
    language: WorkspaceLanguage;
    questionId: string;
    userId: string;
    type: SubmissionType;
  }) => {
    const submissionResponse = await fetch(`${API_URL}/api/v1/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        language_id: languageIds[language],
        question_id: questionId,
        type,
        userId,
      }),
    });

    const submissionPayload =
      (await submissionResponse.json()) as SubmissionResponse;
    if (!submissionResponse.ok || !submissionPayload.data) {
      throw new Error(submissionPayload.message || "Unable to create submission.");
    }

    for (let attempt = 0; attempt < 30; attempt += 1) {
      await wait(2000);
      const resultResponse = await fetch(
        `${API_URL}/api/v1/result?submissionId=${encodeURIComponent(submissionPayload.data)}`,
        { cache: "no-store" },
      );
      const resultPayload = (await resultResponse.json()) as ResultResponse;

      if (!resultResponse.ok || !resultPayload.data) {
        if (resultResponse.status === 404) continue;
        throw new Error(resultPayload.message || "Unable to fetch submission result.");
      }

      if (resultPayload.data.status && resultPayload.data.status !== "QUEUE") {
        const stdout = resultPayload.data.stdout || "";
        const stderr = resultPayload.data.stderr || "";
        return {
          status: resultPayload.data.status,
          output: stdout || stderr,
          outcome: getSubmissionOutcome(resultPayload.data.status, stderr),
          submitted: type === "submission",
        };
      }
    }

    throw new Error("Submission timed out while waiting for Judge0.");
  },
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
      state.submissionLoading = false;
      state.submissionError = null;
      state.submissionStatus = null;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
      state.improvedCode = null;
      state.submissionError = null;
      state.submissionStatus = null;
    },
    setLanguage: (state, action: PayloadAction<WorkspaceLanguage>) => {
      state.language = action.payload;
      state.code = boilerplates[action.payload];
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
      state.improvedCode = null;
      state.submissionError = null;
      state.submissionStatus = null;
    },
    resetCode: (state) => {
      state.code = boilerplates[state.language];
      state.result = "idle";
      state.output = "Run your solution against the sample test case.";
      state.submitted = false;
      state.submissionError = null;
      state.submissionStatus = null;
    },
    runCode: (state) => {
      state.result = "passed";
      state.output = `Sample test passed for ${state.language}.`;
      state.submitted = false;
    },
    submitCode: (state) => {
      state.result = "passed";
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
      })
      .addCase(executeSubmission.pending, (state) => {
        state.result = "running";
        state.output = "Running your code...";
        state.submissionLoading = true;
        state.submissionError = null;
        state.submitted = false;
      })
      .addCase(executeSubmission.fulfilled, (state, action) => {
        state.result = action.payload.outcome;
        state.output = action.payload.output || "No output";
        state.submissionStatus = action.payload.status;
        state.submissionLoading = false;
        state.submitted = action.payload.submitted;
      })
      .addCase(executeSubmission.rejected, (state, action) => {
        state.result = "error";
        state.output = action.error.message || "Unable to run submission.";
        state.submissionLoading = false;
        state.submissionError = state.output;
        state.submissionStatus = null;
        state.submitted = false;
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
