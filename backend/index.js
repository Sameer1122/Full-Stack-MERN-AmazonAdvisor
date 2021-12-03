import express from "express";
import profileRouter from "./routes/profile.js";
import storiesRouter from "./routes/stories.js";
import commentsRouter from "./routes/comments.js";
import userAuth from "./routes/userAuth.js";
import search from "./routes/search.js";
import mongoose from "mongoose";
import adsRouter from "./routes/adsRouter.js";
import fs from "fs";
import path from "path";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/profile", profileRouter);
app.use("/stories", storiesRouter);
app.use("/comments", commentsRouter);
app.use("/user", userAuth);
app.use("/ads", adsRouter);
app.use("/search", search);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://admin:xk2xWGiTizQnTut1@cluster0.yn9qn.mongodb.net/AmazonAdvisor?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
    console.log("Its fucking working");
  })
  .catch((err) => {
    console.log(err);
  });
