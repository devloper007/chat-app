import asyncHandler from "express-async-handler";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";
import { errorHandler, successHandler } from "../util/handler.js";

export const accessChat = asyncHandler(async (req, res) => {
    console.log('access chat-------------');
  const { userId } = req.body;

  if (!userId) {
    console.log("userId hasn't been sent!");
    res.status(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat, {
  path: "latestMessage.sender",
  select: "name pic email",
});

if (isChat.length > 0) {
  res.send(isChat);
} else {
  const chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  };
  try {
    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).send(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
});

export const fetchChat = asyncHandler(async(req,res)=>{
    let chats = await Chat.find({users:{$elemMatch:{$eq: req.user._id}}})
    .populate('users','-password')
    .populate('groupAdmin','-password')
    .populate('latestMessage');
    if(chats){
        chats = await User.populate(chats,{
          path:'latestMessage.sender',
          select:'name email pic'
        });
        await successHandler(res,200,'chats fetched successfully',chats);
    }else{
      await errorHandler(res,404,'no chats found');
    }

});

export const createGroupChat = asyncHandler(async(req,res)=>{
  const { users, name} = req.body;
 // users = JSON.parse(users);
 let allUser = JSON.parse(users)
  if(allUser.length<=0 || !name){
    return await errorHandler(res,400,'please provide more than 1 users and group name');
  }
  
  console.log('all usres',allUser);
  allUser.push(req.user._id);
  if(allUser.length<2){
    return errorHandler(res,400,'please provide more than 1 users')
  }
  const group =  await Chat.create({chatName:name, users:allUser, isGroupChat:true, groupAdmin: req.user._id });
  const getGroup = await Chat.findOne({chatName: name})
  .populate('users','-password').populate('latestMessage')
  .populate('groupAdmin','-password')

  const finalData = await User.populate(getGroup,{
    path:'latestMessage.sender',
    select: 'name email pic'
  });
  await successHandler(res,200,'group chat created',finalData);
});

export const renameGroup = asyncHandler(async(req,res)=>{
  const { id, name} = req.body;
  const updateGroup = await Chat.findByIdAndUpdate(id, {chatName:name},{new: true})
  .populate('users','-password').populate('latestMessage')
  .populate('groupAdmin','-password')

 if(updateGroup){
  const finalData = await User.populate(updateGroup,{
    path:'latestMessage.sender',
    select: 'name email pic'
  });
  await successHandler(res,200,'group name changed',finalData)
 }
});

export const addToGroup = asyncHandler(async(req,res)=>{
  const { id, userId} = req.body;
  
  const updatedGroup = await Chat.findByIdAndUpdate(id, {$push:{users:userId}},{new: true})
  .populate('users','-password').populate('latestMessage')
  .populate('groupAdmin','-password')

 if(updatedGroup){
  // const finalData = await User.populate(updateGroup,{
  //   path:'latestMessage.sender',
  //   select: 'name email pic'
  // });
  await successHandler(res,200,'added to group',updatedGroup)
 }else{
  await errorHandler(res,404,'invalid id or data not found');
 }
});

export const removeFromGroup = asyncHandler(async(req,res)=>{
  const { id, userId} = req.body;
  
  const updatedGroup = await Chat.findByIdAndUpdate(id, {$pull:{users:userId}},{new: true})
  .populate('users','-password').populate('latestMessage')
  .populate('groupAdmin','-password')

 if(updatedGroup){
  // const finalData = await User.populate(updateGroup,{
  //   path:'latestMessage.sender',
  //   select: 'name email pic'
  // });
  await successHandler(res,200,'removed from group',updatedGroup)
 }else{
  await errorHandler(res,404,'invalid id or data not found');
 }
});