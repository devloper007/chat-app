import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

userSchema.methods.matchPassword = async function(enteredPassword){
  console.log('entered',enteredPassword);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function(next){
  if (!this.modified) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  console.log('salt',salt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default User;
