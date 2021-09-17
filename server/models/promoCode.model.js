const { Schema, model } = require("mongoose");

const promoCodeSchema = new Schema({
  campaign: { type: String, required: true },
  CODE: { type: String, required: true },
  validFrom: { type: Date },
  validTo: { type: Date },
  typeDiscount: { type: String },
  discountAmount: { type: Number },
});

const PromoCode = model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
