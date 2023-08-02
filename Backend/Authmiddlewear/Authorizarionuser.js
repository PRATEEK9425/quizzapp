const jwt = require("jsonwebtoken")


const Authenticateusers=(req,res,next)=>{
    const token = req.headers.authorization

    if(token){
const decode = jwt.verify(token,"Hesoyam12")

if(decode){
    const userID=decode.userID
    req.body.userID = userID
    next()
}else{
    res.send("Please login first")
}
    }else{
        res.send("Please login first")
    }
}

module.exports={
    Authenticateusers
}