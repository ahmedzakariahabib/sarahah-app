import express from "express";
import { signup, signin, verify } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validation } from "../../middleware/validation.js";
import { signinSchemaVal, signupSchemaVal } from "./user.validation.js";

const userRouter = express.Router();

userRouter.post("/signup", validation(signupSchemaVal), checkEmail, signup);
userRouter.post("/signin", validation(signinSchemaVal), signin);
userRouter.get("/verify/:token", verify);

export default userRouter;
