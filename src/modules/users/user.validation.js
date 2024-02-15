"use strict";

import Joi from "joi";

// Signup
export const signupSchemaVal = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
  rePassword: Joi.string().valid(Joi.ref("password")).required(),
  age: Joi.number().integer().min(10).max(80).required(),
});

// Signin
export const signinSchemaVal = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
});
