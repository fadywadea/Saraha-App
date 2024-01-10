"use strict"

import jwt from "jsonwebtoken";
import { appError } from "../utils/appError.js";

export const auth = (req, res, next) => {
  jwt.verify(req.header('token'), process.env.JWT_KEY, async (error, decoded) => {
    if (error) return next(new appError(error, 401));
    req.user = decoded;
    next();
  });
};