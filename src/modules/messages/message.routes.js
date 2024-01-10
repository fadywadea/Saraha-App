"use strict"

import express from 'express'
import { addMessage, getAllMessages, shareProfile } from './message.controller.js';
import { auth } from '../../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.post('/message', addMessage);
messageRouter.get('/message', auth, getAllMessages);
messageRouter.get('/shareProfile', shareProfile);

export default messageRouter;