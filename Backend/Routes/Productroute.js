const express = require("express")
const { productmodel } = require("../Models/Productmodel")


const ProductRoutes = express.Router()

ProductRoutes.get("/",async(req,res)=>{
    
    try{
const product = await productmodel.find()
res.send(product)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

ProductRoutes.get("/medcine",async(req,res)=>{
  try{
     const product= await productmodel.find({category:"Medcine" })
     res.send(product)
  }catch(err){
     console.log(err)
     res.send("Something Went Wrong")
  }
})


ProductRoutes.get("/:id",async(req,res)=>{
    const id = req.params.id
    try{
  const product = await  productmodel.findOne({"_id":id})
  res.send(product)
    }catch(err){
  console.log(err)
  res.send({"msg":"Err while gettting data"})
    }
  })

ProductRoutes.post("/create",async(req,res)=>{
    const payload = req.body
  try{
const product = new productmodel(payload)
await product.save()
res.send("Added  Product to Db")

  }catch(err){
console.log(err)
res.send({"msg":"Error while adding Product to Db"})
  }
})


ProductRoutes.patch("/update/:id",async(req,res)=>{
  const payload = req.body
  const id = req.params.id
const product = await productmodel.findOne({"_id":id})
const product_present_in_Db= product.userID
const userId_making_req=req.body.userID
try{
  if(userId_making_req!==product_present_in_Db){
    res.send({"msg":"You are not Authorized to update"})
  }else{
    await productmodel.findByIdAndUpdate({"_id":id},payload)
    res.send("Product Updated in Db")
  }

}catch(err){
console.log(err)
res.send({"msg":"something went wrong"})
}
})


ProductRoutes.delete("/remove/:id",async(req,res)=>{
    
  
  const id = req.params.id
const product = await productmodel.findOne({"_id":id})
const product_present_in_Db= product.userID
const userId_making_req=req.body.userID
try{
  if(userId_making_req!==product_present_in_Db){
    res.send({"msg":"You are not Authorized to Delete"})
  }else{
    await productmodel.findByIdAndDelete({"_id":id})
    res.send("ProductDeleted from in Db")
  }

}catch(err){
console.log(err)
res.send({"msg":"something went wrong"})
}
})






module.exports={
    ProductRoutes
}