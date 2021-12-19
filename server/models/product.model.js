const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: Number, required: true },
    description: { type: String, required: true },
    shortInfo: {
      CPU: { type: String, required: true },
      GPU: { type: String, required: true },
      SSD: { type: String, required: true },
      RAM: { type: String, required: true },
    },
    longInfo: {
      "Screen size": { type: String, required: true },
      OS: { type: String, required: true },
      Weight: { type: String, required: true },
      Display: { type: String, required: true },
      "Display Resolution": { type: String, required: true },
      "Web Camera": { type: String, required: true },
      "Keyboard Backlight": { type: String, required: true },
      Color: { type: String, required: true },
      Warranty: { type: String, required: true },
    },
    price: { type: Number, required: true },
    category: { type: String, required: true, max: 50 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

productSchema
  .virtual("priceWhole")
  .get(function () {
    return this.price.toString().split(".")[0];
  })
  .set(function () {
    price = this.price;
  });

productSchema
  .virtual("priceDecimal")
  .get(function () {
    return this.price.toString().split(".")[1];
  })
  .set(function () {
    price = this.price;
  });

const Product = model("Product", productSchema);

module.exports = Product;
