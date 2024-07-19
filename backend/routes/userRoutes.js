import express from "express";
import { userRegister,login, allUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route('/').post(userRegister).get(protect, allUser);
userRouter.post('/login',login);

export default userRouter