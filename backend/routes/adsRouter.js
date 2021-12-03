import express from "express";
import { check } from "express-validator";
import { getAllAds } from "../controllers/ad.js";
import { postAds } from "../controllers/ad.js";
import { deletePlace } from "../controllers/ad.js";
import { fileUpload } from "../middleware/file-upload.js";
const router = express.Router();
router.get("/", getAllAds);
router.post(
  "/",
  fileUpload.single("img"),
  [
    check("name").not().isEmpty(),
    check("interval").not().isEmpty(),
    check("from").not().isEmpty(),
    check("to").not().isEmpty(),
  ],
  postAds
);
router.delete("/:pid", deletePlace);
export default router;
