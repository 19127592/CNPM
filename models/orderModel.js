const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    seller:{
      type: String,
      default: "RookieSE"
    },
    ship_fee:{
        type:Number,
        default: 5,
    },
    payment: {
        type: String,
        require: true,
        default:"Direct",
    },
    delivery_time:{
        type: String,
        require: true,
        default: "Noon"
    },
    user_information:{
        type: Object,
        default:[],
        require: true,
    },
    progress:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("orders", orderSchema);