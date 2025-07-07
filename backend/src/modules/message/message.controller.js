import { catchError } from "../../middleware/catchError.js";
import { messageModel } from "./../../../databases/models/message.model.js";

import QRcode from "qrcode";

const addMsg = catchError(async (req, res) => {
  await messageModel.insertMany(req.body);
  res.json({ message: "success" });
});

const allMsg = catchError(async (req, res) => {
  // let messages = await messageModel.find({ receivedId: req.user.userId });
  let messages = await messageModel.find({ receivedId: req.params.id });
  res.json({ message: "success", messages });
});

const shareProfile = catchError(async (req, res) => {
  QRcode.toDataURL("http://localhost:3000/messages", (err, qr) => {
    res.send(`<img src="${qr}"/>`);
  });
});

export { addMsg, allMsg, shareProfile };
