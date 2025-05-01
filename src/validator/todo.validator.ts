import { ObjectSchema } from "joi";
import Joi from "joi";
const validTextRegex = /^[A-Za-z0-9\s.,'-]+$/;

export const todoSchema: ObjectSchema<any> = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .pattern(validTextRegex)
    .required()
    .messages({
      "string.empty": "Title cannot be empty",
      "string.pattern.base":
        "Title can only contain letters, numbers, spaces, and basic punctuation",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title must not exceed 100 characters",
      "any.required": "Title is required",
    }),
  description: Joi.string()
    .min(3)
    .max(500)
    .pattern(validTextRegex)
    .required()
    .messages({
      "string.empty": "Description cannot be empty",
      "string.pattern.base":
        "Description can only contain letters, numbers, spaces, and basic punctuation",
      "string.min": "Description must be at least 3 characters long",
      "string.max": "Description must not exceed 500 characters",
      "any.required": "Description is required",
    }),
  status: Joi.string()
    .valid("todo", "in_progress", "pending", "complete")
    .required()
    .messages({
      "any.only": "Status must be one of: todo, in_progress, pending, complete",
      "any.required": "Status is required",
      "string.empty": "Status cannot be empty",
    }),
});
