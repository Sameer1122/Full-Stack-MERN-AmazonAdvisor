import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdsSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  from: {
    type: Date,
    default: Date(),
    required: true,
  },
  to: {
    type: Date,
    default: Date(),
    required: true,
  },
  interval: { type: Number, required: true },
  pid: { type: Number, required: true },
});

export default mongoose.model("ads", AdsSchema);
