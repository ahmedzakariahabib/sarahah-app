import express from "express";
import { dbConnection } from "./databases/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
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
  const error = new Error(`not found endPoint: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

//this error come from cathcError middleware
//this are global error handling middleware any error come here first
//To unify response for frontend
app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
