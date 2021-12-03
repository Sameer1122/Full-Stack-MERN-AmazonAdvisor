import express from "express";
import { check } from "express-validator";
import { getSearch } from "../controllers/search.js";

const router = express.Router();
router.get("/", getSearch);

export default router;
