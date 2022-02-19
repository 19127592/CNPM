const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
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
    brand: {
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
    maintenance_time:{
      type: Number,
      requrire: true
    },
    sold: {
      type: Number,
      default: 0,
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
    GPU:{
      type: String,
    },
    Material:{
      type: String
    },
    DataStorage:{
      type: String
    },
    ConnectionType:{
      type: String
    },
    Weight:{
      type: String,
    },
    Color:{
      type: String,
    },
    //Monitor
    Panel:{
      type: String,
    },
    Resolution:{
      type: String,
    },
    RefreshRate:{
      type: String,
    },
    Response:{
      type: String,
    },
    TechSync:{
      type: String,
    },
    Bright:{
      type: String,
    },
    Contrast:{
      type: String,
    },
    //Keyboard
    Switch:{
      type: String,
    },
    RGB:{
      type: Boolean,
      default: false
    },
    //Headphone
    Type:{
      type: String,
    },
    //Mouse
    DPI:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Products", productSchema);
