const mongoose= require("mongoose")

const order= new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    item:{
        type: Array,
        required: true,
    },
    status:{
        type: String,
        default: "Pending"
    },
    totalPrice:{
        type: Number,
        required: true,
    }
})

const orderDetails = mongoose.model("orderDetails", order)

module.exports = orderDetails