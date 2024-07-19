import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendMessage, getAllMessage } from '../controller/messageController.js';

const messageRouter = express.Router();

messageRouter.route('/').post(protect, sendMessage);
messageRouter.route('/:chatId').get(protect, getAllMessage);

export default messageRouter;