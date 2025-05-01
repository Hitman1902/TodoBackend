import sequelize from "../config/db";
import { User } from "./userModel";
import { initTodoModel, Todo } from "./todoModel";

initTodoModel(sequelize);

Todo.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Todo, { foreignKey: "user_id" });

export { User, Todo };
