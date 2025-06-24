import { userModel } from "../../databases/models/user.model.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
export const checkEmail = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("email already exists.", 409));

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
