const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const {
  storeOTP,
  updatePassword,
  findByEmail,
} = require("../models/user.model");

const { sendOTPEmail } = require("../utils/emailServices");

const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};

const forgetPassword = async (email) => {
  const user = await findByEmail(email);
  if (user.rowCount === 0) {
    throw new Error("User not found");
  }
  const otp = generateOTP();
  await storeOTP(otp);
  await sendOTPEmail(email, otp);

  return "OTP SENT SUCCESSFULLY";
};

const resetPassword = async (email, otp, newPassword) => {
  const user = await findByEmail(email);
  if (user.rowCount === 0) {
    throw new Error("User not Found");
  }

  if (user.rows[0].otp !== parseInt(otp)) {
    throw new error("Invalid otp entered");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updatePassword(email, hashedPassword);

  return "Password reset Successfully";
};

module.exports = { forgetPassword, resetPassword };
