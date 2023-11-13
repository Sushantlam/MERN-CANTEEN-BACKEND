const mongoose= require("mongoose")

const foodItem= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
       
    },

    category:{
       type: String,
       required:true,
    },
    time:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    featured:{
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

const foodItems= mongoose.model("items", foodItem)

module.exports= foodItems