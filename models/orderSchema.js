const mongoose = require("mongoose")

const orderItem = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  item: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
})

const orderItems = mongoose.model("orderItems", orderItem)
module.exports = orderItems