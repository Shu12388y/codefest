import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  blogs as getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  type BlogPayload,
} from "../handlers/handler";

export type Blog = BlogPayload & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogState = {
  items: Blog[];
  loading: boolean;
  error: string | null;
};

const initialState: BlogState = { items: [], loading: false, error: null };

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async () => {
  const response = await getBlogs();
  return response.data as Blog[];
});

export const addBlog = createAsyncThunk("blogs/create", async (form: FormData) => {
  await createBlog(form);
  const response = await getBlogs();
  return response.data as Blog[];
});

export const editBlog = createAsyncThunk("blogs/update", async (payload: Blog & { id: string; thumbnailFile?: File }) => {
  await updateBlog(payload);
  const response = await getBlogs();
  return response.data as Blog[];
});

export const removeBlog = createAsyncThunk("blogs/delete", async (id: string) => {
  await deleteBlog(id);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: { clearBlogError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBlogs.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchBlogs.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); })
      .addCase(addBlog.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addBlog.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(addBlog.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); })
      .addCase(editBlog.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(editBlog.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(editBlog.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); })
      .addCase(removeBlog.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((blog) => blog._id !== action.payload);
      })
      .addCase(removeBlog.rejected, (state, action) => { state.loading = false; state.error = errorMessage(action.error); });
  },
});

export const { clearBlogError } = blogSlice.actions;
export default blogSlice.reducer;