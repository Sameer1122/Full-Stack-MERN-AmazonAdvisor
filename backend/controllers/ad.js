import Ads from "../models/Ads.js";
import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors.js";
import mongoose from "mongoose";
import fs from "fs";

export const getAllAds = (req, res) => {
  Ads.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  }).sort({ from: -1 });
};

// Post Method
export const postAds = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(req.file.path);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, interval, from, to, pid } = req.body;

  const createdPlace = new Ads({
    name,
    interval,
    img: req.file.path,
    from,
    to,
    pid,
  });
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
// Delete Place
export const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  console.log(placeId);
  let place;
  try {
    place = await Ads.findByIdAndDelete(placeId);
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
};
