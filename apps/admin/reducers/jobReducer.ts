import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJob, deleteJob, jobs as getJobs, updateJob, type JobPayload } from "../handlers/handler";

export type Job = JobPayload & { _id: string; createdAt?: string; updatedAt?: string };

type JobState = { items: Job[]; loading: boolean; error: string | null };
const initialState: JobState = { items: [], loading: false, error: null };
const errorMessage = (error: unknown) => error instanceof Error ? error.message : "Something went wrong";

export const fetchJobs = createAsyncThunk("jobs/fetchAll", async () => (await getJobs()).data as Job[]);
export const addJob = createAsyncThunk("jobs/create", async (payload: JobPayload) => {
  await createJob(payload);
  return (await getJobs()).data as Job[];
});
export const editJob = createAsyncThunk("jobs/update", async (payload: Job & { id: string }) => {
  await updateJob(payload);
  return (await getJobs()).data as Job[];
});
export const removeJob = createAsyncThunk("jobs/delete", async (id: string) => {
  await deleteJob(id);
  return id;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: { clearJobError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchJobs.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchJobs.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); })
      .addCase(addJob.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addJob.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(addJob.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); })
      .addCase(editJob.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(editJob.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(editJob.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); })
      .addCase(removeJob.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeJob.fulfilled, (state, action) => { state.loading = false; state.items = state.items.filter((job) => job._id !== action.payload); })
      .addCase(removeJob.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); });
  },
});

export const { clearJobError } = jobSlice.actions;
export default jobSlice.reducer;