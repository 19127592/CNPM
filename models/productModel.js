const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    seller:{
      type: String,
      require: true,
    },
    product_id: {
      type: String,
      require: true,
      unique: true,
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
    },
    //Detail
    CPU: {
      type: String,
    },
    Screen:{
      type: String,
    },
    RAM: {
      type: String,
    },
    Bluetooth:{
      type: Number,
    },
    OS:{
      type: String,
    },
    GPU:{
      type: String,
    },
    DoR: {
      type: Date,
    },
    BatteryCapacity:{
      type: Number,
    },
    Weight:{
      type: Number,
    },
    Material:{
      type: String
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Products", productSchema);
