import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const userAuth =
  mongoose.models.userauths || mongoose.model("userauth", userAuthSchema);
