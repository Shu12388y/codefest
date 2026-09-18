import mongoose from "mongoose";

export const DB_CONNECT = async (url: string) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    throw new Error(String(error));
  }
};
