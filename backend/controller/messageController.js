import asyncHandler from "express-async-handler";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import Chat from "../model/chatModel.js";
import { errorHandler, successHandler } from "../util/handler.js";

export const sendMessage = asyncHandler(async(req,res)=>{
    const message = {
        sender: req.user._id,
        content: req.body.content,
        chat: req.body.chatId
    }
    const messageSent = await Message.create(message);
    console.log('new message',messageSent);
    let newMessage = await Message.findOne(messageSent._id).populate('sender','name pic').populate('chat');
    if(newMessage){
        newMessage = await User.populate(newMessage,{
            path:'chat.users',
            select: 'name email pic'
        });

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage: newMessage
        });
        await successHandler(res,200,'message sent',newMessage)
    }
});

export const getAllMessage = asyncHandler(async(req,res)=>{
    let newMessage = await Message.find({chat:req.params.chatId}).populate('sender','name pic').populate('chat');
    if(newMessage){
        newMessage = await User.populate(newMessage,{
            path:'chat.users',
            select: 'name email pic'
        });
        await successHandler(res,200,'message sent',newMessage)
    }else{
        await errorHandler(res,400,'no message found, invalid id');
    }
});