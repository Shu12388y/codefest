import mongoose from "mongoose";

const userSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      requied: true,
    },
    language: {
      type: String,
      required: true,
    },
    stdout:{
        type:String
    },
    stderr:{
        type:String
    },
    stdin:{
        type:String
    },
    status:{
        type:String,
        default:'QUEUE'
    },
  },
  {
    timestamps: true,
  },
);

export const userSubmission =
  mongoose.models.usersubmissions ||
  mongoose.model("usersubmission", userSubmissionSchema);
