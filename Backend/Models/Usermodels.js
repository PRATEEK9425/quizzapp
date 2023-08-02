const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    username:String,
    dateofbirth:String,
    email:String,
    password:String
   
})

const usermodel = mongoose.model("Register",userschema)

module.exports={
    usermodel
}