import mongoose from "mongoose";

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("profile", placeSchema);
