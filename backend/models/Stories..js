import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storiesSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  date: {
    type: Date,
    default: Date(),
    required: true,
  },
  pid: { type: Number, required: true },
  description: { type: String, required: true },
  sideBar: { type: String, required: true },
  views: { type: Number, required: true },
  tags: [String],
});

export default mongoose.model("stories", storiesSchema);
