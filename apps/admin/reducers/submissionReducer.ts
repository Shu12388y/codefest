import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submissions as getSubmissions, type SubmissionLog } from "../handlers/handler";

type SubmissionState = {
  items: SubmissionLog[];
  loading: boolean;
  error: string | null;
};

const initialState: SubmissionState = {
  items: [],
  loading: false,
  error: null,
};

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const fetchSubmissions = createAsyncThunk(
  "submissions/fetchAll",
  async () => {
    const response = await getSubmissions();
    return response.data || [];
  },
);

const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    clearSubmissionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = errorMessage(action.error);
      });
  },
});

export const { clearSubmissionError } = submissionSlice.actions;
export default submissionSlice.reducer;