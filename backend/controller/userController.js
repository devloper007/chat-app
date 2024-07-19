import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../config/generateToken.js";
import { successHandler, errorHandler } from "../util/handler.js";

export const userRegister = asyncHandler(async (req, res) => {
  //   console.log("register data", req);
  const { name, email, password, pic } = req.body;
  try {
    if (!name || !email || !password)
      throw new Error(404, "please provide all the fields!");
    const userExist = await User.findOne({ email: email });
    // console.log("user,", userExist);
    if (!userExist) {
      const newUser = await User.create({
        name: name,
        email: email,
        password: password,
        pic: pic,
      });
      //   console.log("new user", newUser);
      const token = await generateToken(newUser._id);
      console.log("token", token);
      return res.status(200).json({
        status: "success",
        data: newUser,
        token: token,
      });
    } else if (userExist) {
      return res.status(201).json({
        status: "user already exist!",
        data: userExist,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "internal server error,try again.",
      message: error.message,
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (user) {
      return res.status(200).json({
        status: "success",
        message: "user fetched successfully",
        data: user,
        token: await generateToken(user._id),
      });
    }
    return res.json({
      status: "failed",
      message: "resource not found/incorrect password",
    });
  } catch (error) {
    return res.json({
      status: "failed",
      code: 500,
      message: error.message,
    });
  }
});

export const allUser = asyncHandler(async (req, res) => {
    console.log("serch", req.query.search);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
try {
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  if(users){

    await successHandler(res,200,"data fetched successfully",users);
  }else{
    await errorHandler(res,404,"data not found");
  }
      
    } catch (error) {
      await errorHandler(res,500,"Internal server error");
    }
  });
