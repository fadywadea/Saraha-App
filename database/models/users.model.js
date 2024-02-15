"use strict";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },
  isActiveL: {
    type: Boolean,
    default: true,
  },
},
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
