"use strict";

import express from "express";
import { addMessage, getAllMessages, shareProfile, } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addMsgSchemaVal, paramsVal } from "./message.validation.js";

const messageRouter = express.Router();

messageRouter.post("/message", validation(addMsgSchemaVal), auth, addMessage);
messageRouter.get("/message/:id", validation(paramsVal), auth, getAllMessages);
messageRouter.get("/shareProfile", shareProfile);

export default messageRouter;
