import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    metatags: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blogs =
  mongoose.models.blogs || mongoose.model("blog", blogSchema);
