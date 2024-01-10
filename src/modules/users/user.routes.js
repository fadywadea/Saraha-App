"use strict"

import express from 'express'
import { getAllUsers, signin, signup, verifyEmail } from "./user.controller.js"
import { checkEmail } from '../../middleware/checkEmailExist.js';

const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/users', checkEmail, signup);
userRouter.get('/verify/:token', verifyEmail);
userRouter.post('/signin', signin);

export default userRouter;