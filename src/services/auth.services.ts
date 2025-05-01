import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { sendOTPEmail } from "../utils/emailServices";

const generateOTP = (): number => {
  return crypto.randomInt(100000, 999999);
};

export const forgetPassword = async (email: string): Promise<string> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = generateOTP();
  await user.update({ otp });

  await sendOTPEmail(email, otp);

  return "OTP SENT SUCCESSFULLY";
};

export const resetPassword = async (
  email: string,
  otp: number,
  newPassword: string
): Promise<string> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP entered");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedPassword, otp: null });

  return "Password reset successfully";
};
