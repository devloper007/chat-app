import mongoose from "mongoose";

const connectDB = async () => {
 try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log("mogodb connected: ",conn.connection.host);
 } catch (error) {
    console.log("Error: ",error);
    process.exit();
 }
};

export default connectDB;
