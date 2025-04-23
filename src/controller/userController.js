const pool = require("../config/db");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const cookie = require("cookie-parser");

const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name must be valid string " });
  }
  if (!emailregex.test(email)) {
    return res.status(400).json({ error: "Email must be valid" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password length must be atleast 8" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );
    const token = jwt.sign(
      { id: result.rows[0].id, name: result.rows[0].name, email },
      process.env.JWT_SECRET,
      { expiresIn: "520h" }
    );
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

  if (!emailregex.test(email)) {
    res.status(400).json({ error: "Email not valid" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "password length must be more than 8" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400), json({ error: "User not Found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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

module.exports = { signup, login, logout };
