const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  promoCodeUsed: { type: Schema.Types.ObjectId, ref: "promocodes" },
  amount: { type: Number },
  address: {
    type: Object,
  },
  phoneNumber: { type: String },
  status: { type: String, maxlength: 10 },
});

const Order = model("Order", orderSchema);

module.exports = Order;
