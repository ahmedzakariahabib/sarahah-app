import { messageModel } from "./../../../databases/models/message.model.js";

const addMsg = async (req, res) => {
  await messageModel.insertMany(req.body);
  res.json({ message: "success" });
};

const allMsg = async (req, res) => {
  let messages = await messageModel.find({ receivedId: req.user.userId });
  res.json({ message: "success", messages });
};

export { addMsg, allMsg };
