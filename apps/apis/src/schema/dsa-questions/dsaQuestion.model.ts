import mongoose from "mongoose";

const dsaQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    testInput: {
      type: String,
      required: true,
    },
    testOutput: {
      type: String,
      required: true,
    },
    judgeInput: {
      type: String,
      required: true,
    },
    judgeOutput: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const DsaQuestion =
  mongoose.models.dsaquestions ||
  mongoose.model("dsaquestion", dsaQuestionSchema);
