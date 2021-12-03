import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors.js";
import Stories from "../models/Stories..js";

export const getSearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    console.log(tags);
    console.log(tags.split(","));
    const title = new RegExp(searchQuery, "i");

    const posts = await Stories.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    }).sort({ date: -1 });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
