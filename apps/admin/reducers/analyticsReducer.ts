import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analysis } from "../handlers/handler";

export type AnalyticsData = {
  blogs: { total: number };
  jobs: { total: number };
  openRouter: {
    credits: { total_credits?: number; total_usage?: number };
    key: { label?: string; limit?: number | null; usage?: number; is_free_tier?: boolean; rate_limit?: unknown };
  };
};

type AnalyticsState = { data: AnalyticsData | null; loading: boolean; error: string | null };
const initialState: AnalyticsState = { data: null, loading: false, error: null };

export const fetchAnalytics = createAsyncThunk("analytics/fetch", async () => {
  const response = await analysis();
  return response.data as AnalyticsData;
});

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: { clearAnalyticsError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAnalytics.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchAnalytics.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Unable to load analytics"; });
  },
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;