import express from "express";
import { getAllUsers, signin, signup, verifyEmail } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmailExist.js";
import { validation } from "../../middleware/validation.js";
import { signinSchemaVal, signupSchemaVal } from "./user.validation.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", validation(signupSchemaVal), checkEmail, signup);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/signin", validation(signinSchemaVal), signin);

export default userRouter;
