import express from "express";
import { addMsg, allMsg, shareProfile } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";

const messageRouter = express.Router();

messageRouter.post("/messages", addMsg);
messageRouter.get("/messages", auth, allMsg);
messageRouter.get("/shareProfile", shareProfile);

export default messageRouter;
