import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors.js";
import Stories from "../models/Stories..js";
import mongoose from "mongoose";
import fs from "fs";
export const getAllStories = (req, res) => {
  Stories.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  }).sort({ date: -1 });
};

// Post Method Of Stories

export const postStories = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, date, sideBar, views, pid, tags } = req.body;

  const createdPlace = new Stories({
    title,
    description,
    img: req.file.path,
    date,
    sideBar,
    views,
    pid,
    tags: tags.split(","),
  });
  console.log(tags);
  try {
    const data = await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ stories: createdPlace });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  console.log(placeId);
  let place;
  try {
    place = await Stories.findByIdAndDelete(placeId);
    console.log(place);
    fs.unlink(place.img, (err) => {
      console.log(err);
    });
    res.status(200).json({ message: "Deleted place." });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  // if (!place) {
  //   const error = new HttpError("Could not find place for this id.", 404);
  //   return next(error);
  // }

  // const imagePath = place.image;

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await place.remove({ session: sess });
  //   place.pid.pull(place);
  //   await place.pid.save({ session: sess });
  //   await sess.commitTransaction();
  // } catch (err) {
  //   const error = new HttpError(
  //     "Something went wrong, could not delete place.",
  //     500
  //   );
  //   return next(error);
  // }

  // fs.unlink(imagePath, (err) => {
  //   console.log(err);
  // });
};
export const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, sideBar } = req.body;
  const placeId = req.params.uid;
  console.log(placeId);
  let story;
  try {
    story = await Stories.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  story.title = title;
  story.description = description;
  story.img = req.file.path;
  story.sideBar = sideBar;

  try {
    await story.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ stories: story.toObject({ getters: true }) });
};
export const updateViews = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { views } = req.body;
  const placeId = req.params.uid;
  console.log(placeId);
  console.log(views);
  let story;
  console.log();
  try {
    story = await Stories.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  story.views = views + 1;

  try {
    await story.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ stories: story.toObject({ getters: true }) });
};
