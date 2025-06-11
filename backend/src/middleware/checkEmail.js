import { userModel } from "../../databases/models/user.model.js";
import bcrypt from "bcrypt";
export const checkEmail = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return res.json({ message: "email already exists." });

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
