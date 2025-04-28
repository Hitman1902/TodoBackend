const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  logout,
  resetPasswordRequest,
  forgetPasswordRequest,
} = require("../controller/userController");

const {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/auth.validators");

const validateRequest = require("../middleware/validateRequest");

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

module.exports = router;
