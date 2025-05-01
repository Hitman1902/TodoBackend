// userController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import { JwtPayload } from "../types/jwt";
import { forgetPassword, resetPassword } from "../services/auth.services";
import { RequestHandler } from "express";

// Define User interface to ensure type safety when accessing properties
interface UserModel {
  id: string | number;
  name: string;
  email: string;
  password: string;
}

export const signup: RequestHandler = async (req, res): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Type assertion to ensure newUser has the right structure
    const newUser = (await User.create({
      name,
      email,
      password: hashedPassword,
    })) as unknown as UserModel;

    const token = generateToken(newUser.id, newUser.name, email);
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (err: any) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const login: RequestHandler = async (req, res): Promise<void> => {
  const { email, password } = req.body;
  try {
    // Type assertion to ensure loginUser has the right structure when found
    const loginUser = (await User.findOne({
      where: { email },
    })) as unknown as UserModel | null;

    if (!loginUser) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      res.status(400).json({ error: "Incorrect password" });
      return;
    }

    const token = generateToken(loginUser.id, loginUser.name, email);
    res.status(200).json({
      message: `Hi ${loginUser.name}, welcome back!`,
      user: loginUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout: RequestHandler = (_req, res): void => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const forgetPasswordRequest: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { email } = req.body;

  try {
    const message = await forgetPassword(email);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPasswordRequest: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { email, otp, newPassword } = req.body;

  try {
    const message = await resetPassword(email, Number(otp), newPassword);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
