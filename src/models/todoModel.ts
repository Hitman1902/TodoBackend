import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { User } from "./userModel";

export interface TodoAttributes {
  id?: number;
  title: string;
  description?: string;
  status?: "complete" | "in_progress" | "pending" | "todo";
  created_at?: Date;
  user_id?: number;
}

export interface TodoCreationAttributes
  extends Optional<
    TodoAttributes,
    "id" | "description" | "status" | "created_at" | "user_id"
  > {}

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: "complete" | "in_progress" | "pending" | "todo";
  public created_at!: Date;
  public user_id!: number;
}

export const initTodoModel = (sequelize: Sequelize): typeof Todo => {
  Todo.init(
    {
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
    },
    {
      sequelize,
      modelName: "Todo",
      tableName: "Todos",
      timestamps: false,
    }
  );

  return Todo;
};
