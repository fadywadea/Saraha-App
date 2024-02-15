"use strict";

import { userModel } from "../../database/models/users.model.js";
import bcrypt from "bcrypt";
import { appError } from "../utils/appError.js";

export const checkEmail = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return next(new appError("Email already in use.", 409));
  } else {
    // Hash password before saving to database
    req.body.password = bcrypt.hashSync(req.body.password, +process.env.HASH_ROUND);
    next();
  }
};
