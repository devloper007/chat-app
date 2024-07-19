import express from "express";
import { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } from "../controller/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const chatRouter = express.Router();

chatRouter.route('/').post(protect, accessChat);
chatRouter.route('/').get(protect, fetchChat);
chatRouter.route('/create-group').post(protect, createGroupChat);
chatRouter.route('/group-rename').put(protect, renameGroup);
chatRouter.route('/group-add').put(protect, addToGroup);
chatRouter.route('/group-remove').put(protect, removeFromGroup);

export default chatRouter;