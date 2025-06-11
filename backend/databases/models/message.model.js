import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    message: String,
    receivedId: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("message", schema);
