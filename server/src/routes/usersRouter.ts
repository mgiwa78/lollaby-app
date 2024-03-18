import express from "express";
import {
  Update__OWN_USER__PUT,
  Fetch__MY_PROFILE__GET
} from "../controllers/User-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { body } from "express-validator";

const router = express.Router();

router.put("/myProfile/update", AuthenticateUser, Update__OWN_USER__PUT);
router.get(
  "/myProfile/view",
  AuthenticateUser,
  // hasPermission("put"),
  Fetch__MY_PROFILE__GET
);

export default router;
