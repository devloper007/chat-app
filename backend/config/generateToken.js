import jwt from "jsonwebtoken";

const generateToken = async(id)=>{
    return jwt.sign({id},"Rakesh1796",{
        expiresIn: "10d"
    });
}

export default generateToken