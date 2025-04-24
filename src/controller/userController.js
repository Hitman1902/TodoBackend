const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/userModel");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("Checking if user is creating or not ", newUser);
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email },
      process.env.JWT_SECRET,
      { expiresIn: "52h" }
    );
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await user.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: loginUser.id, name: loginUser.name, email },
      process.env.JWT_SECRET,
      { expiresIn: "52h" }
    );
    res.status(200).json({
      message: `Hi ${loginUser.name}, welcome back!`,
      loginUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
