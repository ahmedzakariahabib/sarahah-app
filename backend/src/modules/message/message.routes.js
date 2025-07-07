import express from "express";
import { addMsg, allMsg, shareProfile } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addMsgSchemaVal, paramsVal } from "./message.validation.js";

const messageRouter = express.Router();

messageRouter.post("/messages", validation(addMsgSchemaVal), addMsg);
messageRouter.get("/messages/:id", validation(paramsVal), auth, allMsg);
messageRouter.get("/shareProfile", shareProfile);

export default messageRouter;
