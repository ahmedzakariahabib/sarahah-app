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
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
