import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  commentId: { type: Number, required: true },
  date: {
    type: Date,
    default: Date(),
    required: true,
  },
});

export default mongoose.model("comment", commentSchema);
