import { sendEmail } from "../../emails/sendEmail.js";
import { userModel } from "./../../../databases/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

const signup = catchError(async (req, res) => {
  await userModel.insertMany(req.body);
  // sendEmail(req.body.email);
  res.json({ message: "success" });
});

const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ userId: user._id, email: user.email }, "ayKey");
    res.json({ message: "success", token });
  }
  // res.json({ message: "incorret email or password" });

  next(new AppError("incorret email or password", 401));
});

const verify = catchError(async (req, res, next) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) return next(new AppError(err, 401));

    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { verifyEmail: true }
    );
    res.json({ message: "success" });
  });
});

export { signup, signin, verify };
