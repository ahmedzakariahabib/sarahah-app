//work when are there problem in syntax code
//shoud be in first component
process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import { globalError } from "./src/middleware/GlobalErrorMiddleWare.js";
import { uploadSingleFile } from "./src/fileUpload/uploads.js";
import { photoModel } from "./databases/models/photo.model.js";
import { dbConnection } from "./databases/dbConnection.js";
import { AppError } from "./src/utils/AppError.js";
import { v2 as cloudinary } from "cloudinary";
import messageRouter from "./src/modules/message/message.routes.js";
import userRouter from "./src/modules/user/user.routes.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
dbConnection();

app.use("/", express.static("uploads"));
app.use(express.json());
cloudinary.config({
  cloud_name: "dxjtaltvu",
  api_key: "742444616182915",
  api_secret: "2FaF0IiOp5YmeLTt1NZYDtkLoHo",
});

app.post("/photos", uploadSingleFile("img"), async (req, res) => {
  // req.body.img = req.file.filename;
  // // req.body.img = req.files.img[0].filename;
  // // let images = req.files.images.map((val) => val.filename);
  // // req.body.images = images;
  // await photoModel.insertMany(req.body);
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path)
    .catch((error) => {
      console.log(error);
    });
  req.body.img = uploadResult.secure_url;
  await photoModel.insertMany(req.body);
  res.json({ message: "success" });
});

app.get("/photos", async (req, res) => {
  //to delete image from cloud
  // cloudinary.uploader.destroy("v7ajnxponbydywhq7oab", (err, result) => {
  //   console.log(result);
  // });
  let photos = await photoModel.find();
  res.json({ message: "success", photos });
});

app.use(userRouter);
app.use(messageRouter);
app.get("/", (req, res) => res.send("Hello with sarahah-app"));

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

app.listen(port, () => console.log(`sarahah app listening on port ${port}!`));
