"use strict";

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: String,
  received: mongoose.Types.ObjectId
}, { timestamps: true });

export const messageModel = mongoose.model('message', messageSchema);