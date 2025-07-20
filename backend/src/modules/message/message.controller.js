import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { messageModel } from "./../../../databases/models/message.model.js";
import QRcode from "qrcode";

const addMsg = catchError(async (req, res) => {
  await messageModel.insertMany(req.body);
  res.json({ message: "success" });
});

const allMsg = catchError(async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return next(
      new AppError("You are not authorized to access these messages", 403)
    );
  }
  console.log(req.user);
  let messages = await messageModel.find({ receivedId: req.params.id });
  res.json({ message: "success", messages });
});

const shareProfile = catchError(async (req, res) => {
  const userId = req.user.userId;
  const profileUrl = `http://localhost:3000/myprofile/${userId}`;
  QRcode.toDataURL(profileUrl, (err, qr) => {
    if (err) return res.status(500).json({ message: "QR generation failed" });
    res.send(`<img src="${qr}"/>`);
  });
});

export { addMsg, allMsg, shareProfile };
