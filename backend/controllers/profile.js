import { validationResult } from "express-validator";
import { HttpError } from "../models/http-errors.js";
import Profile from "../models/profile.js";
import mongoose from "mongoose";

export const getProfile = async (req, res, next) => {
  const placeId = req.params.uid;

  let profile;
  try {
    profile = await Profile.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!profile) {
    const error = new HttpError(
      "Could not find place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ profile: profile.toObject({ getters: true }) });
};

// export const updatePlace = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }

//   const { name, description, image } = req.body;
//   console.log(name, description, image);
//   const createProfile = new Profile({
//     name,
//     description,
//     image,
//   });
//   try {
//     await createProfile.save();
//   } catch (err) {
//     const error = new HttpError("Creating Place Faild Please Try Again", 500);
//     return next(error);
//   }

//   res.status(201).json({ profile: createProfile });
// };
export const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, description } = req.body;
  const placeId = req.params.uid;
  console.log(placeId);
  let profile;
  try {
    profile = await Profile.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  try {
    profile.name = name;
    profile.description = description;
    profile.image = req.file.path;
  } catch (error) {
    console.log(req.file.path);
  }

  try {
    await profile.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ profile: profile.toObject({ getters: true }) });
};
