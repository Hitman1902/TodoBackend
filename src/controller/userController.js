const pool = require("../config/db");

const bcrypt = require("bcryptjs");

const cookie = require("cookie-parser");

const { createUser, findByEmail } = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");

const { forgetPassword, resetPassword } = require("../services/auth.services");
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUser(name, email, hashedPassword);
    const token = generateToken(result.rows[0].id, result.rows[0].name, email);
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered Successful",
      user: result.rows[0],
      token,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await findByEmail(email);
    if (result.rows.length === 0) {
      return res.status(400), json({ error: "User not Found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = generateToken(user.id, user.name, email);

    res.status(200).json({
      message: `Hi ${user.name}, welcome back!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const logout = (req, res) => {
  console.log("Inside logout");
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const forgetPasswordRequest = async (req, res) => {
  const email = req.body;

  try {
    const message = await forgetPassword(email);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPasswordRequest = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const message = await resetPassword(email, otp, newPassword);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: message });
  }
};
module.exports = {
  signup,
  login,
  logout,
  forgetPasswordRequest,
  resetPasswordRequest,
};
