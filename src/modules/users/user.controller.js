"use strict";

import { userModel } from "../../../database/models/users.model.js";
import { sendEmail } from "../../emails/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { appError } from "../../utils/appError.js";

// All users
export const getAllUsers = catchError(async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ data: users });
});

// Signup
export const signup = catchError(async (req, res) => {
  const { name, email, password, rePassword, age } = req.body;
  await userModel.insertMany({ name, email, password, rePassword, age });
  sendEmail(req.body.email, req.body.name);
  res.status(201).json({ message: "success" });
});

// Verify Email
export const verifyEmail = catchError(async (req, res, next) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, async (error, decoded) => {
    if (error) return next(new appError(error, 401));
    await userModel.findOneAndUpdate({ email: decoded.email }, { verifyEmail: true });
    res.status(200).json({ message: "Account was verified" });
  });
});

// Signin
export const signin = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      if (user.verifyEmail) {
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_KEY);
        return res.status(200).json({ message: `Welcome ${user.name}.`, token });
      } else {
        next(new appError("Account not verify.", 401));
      }
    } else {
      next(new appError("Invalid Password.", 401));
    }
  } else {
    next(new appError("Invalid Email.", 401));
  }
});
