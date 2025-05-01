import Joi from "joi";
import type { ObjectSchema } from "joi";
export const signUpSchema: ObjectSchema<any> = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

export const loginSchema: ObjectSchema<any> = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
});

export const forgotPasswordSchema: ObjectSchema<any> = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

export const resetPasswordSchema: ObjectSchema<any> = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  otp: Joi.string().length(6).required().messages({
    "string.empty": "OTP cannot be empty",
    "string.length": "OTP must be exactly 6 digits",
    "any.required": "OTP is required",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});
