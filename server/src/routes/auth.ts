import express from "express";
import {
  Fetch__USER_PROFILE__POST,
  SignIn__AUTH__POST,
  SignUp__AUTH__POST
} from "../controllers/Auth-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import {
  forgotPasswordController,
  passwordUpdateController,
  verifyPasswordRequestTokenController
} from "../controllers/ForgotPassword-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";

const authRouter = express.Router();

authRouter.post("/signin", SignIn__AUTH__POST);
authRouter.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address")
  ],
  ValidateRequest,
  SignUp__AUTH__POST
);

authRouter.get("/me", AuthenticateUser, Fetch__USER_PROFILE__POST);
authRouter.post("/forgotPassword", forgotPasswordController);
authRouter.post("/passwordUpdate", passwordUpdateController);
authRouter.post(
  "/verifyPasswordRequestToken",
  verifyPasswordRequestTokenController
);

export default authRouter;
