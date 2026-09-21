import mongoose from "mongoose";

const JobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    tags: {
      type: String,
    },
    overview: {
      type: String,
      required: true,
    },
    selectionProcess: {
      type: String,
      required: true,
    },
    applicationProcess: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    eligiblity: {
      type: String,
    },
    qualification: {
      type: String,
    },
    branch: {
      type: String,
    },
    experience: {
      type: String,
    },
    salary: {
      type: String,
    },
    location: {
      type: String,
    },
    applicationDate: {
      type: String,
    },
    applicationDeadline: {
      type: String,
    },
    interviewDate: {
      type: String,
    },
    applyLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const JobPost =
  mongoose.models.jobposts || mongoose.model("jobpost", JobPostSchema);
