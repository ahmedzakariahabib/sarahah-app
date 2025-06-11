import express from "express";
import { signup, signin, verify } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = express.Router();

userRouter.post("/signup", checkEmail, signup);
userRouter.post("/signin", signin);
userRouter.get("/verify/:token", verify);

export default userRouter;
