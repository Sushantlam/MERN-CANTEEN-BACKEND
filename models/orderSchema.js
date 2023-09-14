const mongoose = require("mongoose")

const orderItem = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  item: {
    type: Array,
    required: true,
  }
})

const orderItems = mongoose.model("orderItems", orderItem)
module.exports = orderItems