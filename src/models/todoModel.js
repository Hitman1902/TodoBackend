const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const user = require("./userModel");

const todo = sequelize.define("todo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("complete", "in_progress", "pending", "todo"),
    defaultValue: "todo",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

todo.belongsTo(user, { foreignKey: "user_id", onDelete: "CASCADE" });
user.hasMany(todo, { foreignKey: "user_id" });

module.exports = todo;
