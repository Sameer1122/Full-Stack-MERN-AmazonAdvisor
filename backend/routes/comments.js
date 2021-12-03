import express from "express";
import { check } from "express-validator";
import { getAllComments } from "../controllers/comment.js";
import { postComment } from "../controllers/comment.js";
const router = express.Router();
router.get("/", getAllComments);
router.post(
  "/",
  [check("user").not().isEmpty(), check("message").not().isEmpty()],
  postComment
);
export default router;
