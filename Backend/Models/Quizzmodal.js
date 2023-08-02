const mongoose =require("mongoose")

const quizzschema = mongoose.Schema({
    "q_id":Number,
    "imgurl":String,
    "qno":Number,
    "question":String,
    "optionarr" :Array,
    "correct_ans":String
   

})

const quizzmodel = mongoose.model("Quizzdata",quizzschema)

module.exports ={
    quizzmodel
}