import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors.js";
import Comment from "../models/Comment.js";

export const getAllComments = (req, res) => {
  Comment.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  }).sort({ date: 1 });
};

// Post Comment
export const postComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { user, message, commentId, date } = req.body;

  const createdPlace = new Comment({
    user,
    message,
    commentId,
    date,
  });
  console.log(createdPlace);
  try {
    const data = await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ comments: createdPlace });
};
