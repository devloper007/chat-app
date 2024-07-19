import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import chats from "./data/data.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRouter);

app.get('/api',(req,res)=>{
    res.send("server started...")
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
    const chatData = chats.find(c => c._id === req.params.id);
  res.send(chatData);
});


const server = app.listen(process.env.PORT,()=>{
    console.log(`app is listening on ${process.env.PORT}`);
});

const io = new Server(server,{
  pingTimeout: 60000,
  cors:{
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket)=>{
  console.log("connected to socket.io");
  socket.on('setup', (userData)=>{
    socket.join(userData._id);
    // console.log('user id',userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room)=>{
    socket.join(room);
    console.log('room id',room);
  });

  socket.on('new mesage',(newMessageRecieved)=>{
    var chat = newMessageRecieved.chat;
    if(!chat.users) return console.log('no user in this chat');

    chat.users.forEach(user => {
      if(user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit('message recieved',newMessageRecieved)
    });
  })

})