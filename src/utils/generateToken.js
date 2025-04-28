const jwt = require("jsonwebtoken");

const generateToken = (id, name, email) => {
  return jwt.sign({ id: id, name: name, email }, process.env.JWT_SECRET, {
    expiresIn: "520h",
  });
};

module.exports = { generateToken };
