import express from "express";
import { check } from "express-validator";
import { getUsers } from "../controllers/users.js";
import { signup } from "../controllers/users.js";
import { login } from "../controllers/users.js";
const router = express.Router();
router.get("/", getUsers);
// router.patch(
//   "/:uid",
//   [
//     check("name").not().isEmpty(),
//     check("description").not().isEmpty(),
//     check("image").not().isEmpty(),
//   ],
//   updatePlace
// );
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);
router.post("/login", login);
export default router;
