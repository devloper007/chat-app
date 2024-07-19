import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  console.log('protect---------',req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('id',decodedToken.id);
      req.user = await User.findOne({ _id: decodedToken.id }).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed")
    }
  }
  if(!token){
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
