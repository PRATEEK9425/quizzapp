const express = require ("express")
const { quizzmodel } = require("../Models/Quizzmodal")

const QuizzRoutes = express.Router()

QuizzRoutes.get("/",async(req,res)=>{
    
    try{
const product = await quizzmodel.find()
res.send(product)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})


QuizzRoutes.get("/:id",async(req,res)=>{
  const id = req.params.id
  try{
const product = await  quizzmodel.findOne({"q_id":id })
res.send(product)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})




QuizzRoutes.post("/create",async(req,res)=>{
    const payload = req.body
  try{
const product = new quizzmodel(payload)
await product.save()
res.send("Added  Product to Db")

  }catch(err){
console.log(err)
res.send({"msg":"Error while adding Product to Db"})
  }
})

module.exports={
    QuizzRoutes
}