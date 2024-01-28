'use strict'

import Joi from "joi";

// Signup
export const addMsgSchemaVal = Joi.object({
  message: Joi.string().alphanum().min(5).max(300).required(),
  received: Joi.string().hex().length(24).required(),
});

export const paramsVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
