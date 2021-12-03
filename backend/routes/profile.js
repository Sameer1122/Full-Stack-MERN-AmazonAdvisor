import express from "express";
import { getProfile } from "../controllers/profile.js";
import { updatePlace } from "../controllers/profile.js";
import { fileUpload } from "../middleware/file-upload.js";

import { check } from "express-validator";
const router = express.Router();
router.get("/:uid", getProfile);
router.patch(
  "/:uid",
  fileUpload.single("image"),
  [check("name").not().isEmpty(), check("description").not().isEmpty()],
  updatePlace
);
export default router;
