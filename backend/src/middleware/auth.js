import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  jwt.verify(req.header("token"), "ayKey", (err, decoded) => {
    if (err) return res.json(err);
    req.user = decoded;
    next();
  });
};
