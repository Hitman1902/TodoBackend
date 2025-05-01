import express, { Router } from "express";
import {
  signup,
  login,
  logout,
  forgetPasswordRequest,
  resetPasswordRequest,
} from "../controller/userController";
import {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validator/auth.validator";
import validateRequest from "../middleware/validateRequest";

const router: Router = express.Router();

router.post("/signup", validateRequest(signUpSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);
router.post(
  "/forget-password",
  validateRequest(forgotPasswordSchema),
  forgetPasswordRequest
);
router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  resetPasswordRequest
);

export default router;
