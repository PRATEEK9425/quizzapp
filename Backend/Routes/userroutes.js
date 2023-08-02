const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { usermodel } = require("../Models/Usermodels");

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,dateofbirth} = req.body
    const saltRounds = 8
    try{
        bcrypt.hash(password, saltRounds, async(err, Secure_password)=>{
            // err encounter while hashing
            if(err){
                console.log(err)
                res.send("Err while Hshing process")

            }else{
                const user = new usermodel({username,email,password:Secure_password,dateofbirth})
                await user.save()
                res.send({"User Registered":"successfully"})
            }
        })


    }catch(err){
        // err encounter while registering
        res.send("Err while registering user")
console.log(err)

    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} =req.body
    
    try{
        const user = await usermodel.find({email})
if(user.length>0){
    bcrypt.compare(password, user[0].password, (err, result)=> {
        if(result){
            var token = jwt.sign({ userID:user[0]._id }, 'Hesoyam12');
            res.send({"msg":"Login successful","token":token})
        }else{
            res.send("Wrong credential")
        }
    })
   
}else{
    res.send("Wrong credential")
}
    }catch(err){
res.send("Having Trouble In Login")
        connsole.log(err)
    }
})

module.exports={
    userRouter
}
