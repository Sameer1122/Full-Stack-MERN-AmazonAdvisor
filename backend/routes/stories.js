import express from "express";
import { check } from "express-validator";
import { postStories } from "../controllers/Stories.js";
import { getAllStories } from "../controllers/Stories.js";
import { deletePlace } from "../controllers/Stories.js";
import { updatePlace } from "../controllers/Stories.js";
import { fileUpload } from "../middleware/file-upload.js";
import { updateViews } from "../controllers/Stories.js";
const router = express.Router();
router.get("/", getAllStories);
router.patch(
  "/:uid",
  fileUpload.single("img"),
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  updatePlace
);
router.patch("/update/:uid", updateViews);
router.post(
  "/",
  fileUpload.single("img"),
  [
    check("title").not().isEmpty(),
    check("sideBar").not().isEmpty(),
    check("views").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  postStories
);
router.delete("/:pid", deletePlace);
export default router;
