const mongoose = require("mongoose")

const productschema = mongoose.Schema({
   "topicimg":String,
   "category":String
})

const productmodel = mongoose.model("Productsdata",productschema)

module.exports={
    productmodel
}