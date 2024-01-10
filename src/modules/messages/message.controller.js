"use strict"

import { messageModel } from "../../../database/models/messages.model.js";
import { catchError } from "../../middleware/catchError.js";
import { appError } from "../../utils/appError.js";
import QRcode from "qrcode";

// Add Message
export const addMessage = catchError(async (req, res) => {
  const message = await messageModel.insertMany(req.body);
  res.status(201).json({ data: message });
});

// All Messages
export const getAllMessages = catchError(async (req, res, next) => {
  const messages = await messageModel.find({ received: req.user.userId });
  if (messages.length) {
    res.status(200).json({ data: messages });
  } else {
    next(new appError('No messages found.', 404));
  }
});

// Share Profile
export const shareProfile = catchError(async (req, res) => {
  QRcode.toDataURL("localhost:3000/api/v1/message", (error, qr) => {
    res.status(200).send(`<img src="${qr}"/>`);
  });
});