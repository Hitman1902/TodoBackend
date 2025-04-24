const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydb", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
