import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  options: {
    type: String,
    required: true,
  },
});
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: optionSchema,
  },
  correctOption: {
    type: String,
    required: true,
  },
});
const quizSchema = new mongoose.Schema(
  {
    topic:{
      type:String,
      required:true
    },
    subtopic:{
      type:String,
      required:true
    },
    quiz: {
      type: [questionSchema],
    },
    upvote: {
      type: String,
      default: "0",
    },
    downvote: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
  },
);

export const Quiz = mongoose.models.quiz || mongoose.model("quiz", quizSchema);
