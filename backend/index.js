//work when are there problem in syntax code
//shoud be in first component
process.on("uncaughtException", (err) => {
  console.log("error", err);
});

import express from "express";
import { dbConnection } from "./databases/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/middleware/GlobalErrorMiddleWare.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(messageRouter);
app.get("/", (req, res) => res.send("Hello World!"));

dbConnection();

// app.use("*", (req, res, next) => {
//   //page not found not error you put in error to go global error
//   //this next go to global error
//   next(new Error(`not found endPoint: ${req.originalUrl}`));
// });

app.use((req, res, next) => {
  next(new AppError(`not found endPoint: ${req.originalUrl}`, 404));
});

//this error come from cathcError middleware
//this are global error handling middleware any error come here first
//To unify response for frontend
//shoud be in last component
app.use(globalError);

//there are global object in node as window in js call process
// work when are there problem out express example connection mongdb
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
