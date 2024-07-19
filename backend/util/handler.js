export const successHandler = (res,code, message,data)=>{
   return res.status(code).json({
            success: true,
            message: message,
            data:data
    });
}

export const errorHandler = (res,code,message)=>{
    return res.status(code).json({
            success: false,
            message: message
    });
}
