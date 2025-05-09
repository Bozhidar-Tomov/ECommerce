const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: [3, "Name must be between 3 and 40 characters"],
      max: [40, " Name must be between 3 and 40 characters"],
    },
    lastName: {
      type: String,
      required: true,
      min: [3, "Name must be between 3 and 40 characters"],
      max: [40, " Name must be between 3 and 40 characters"],
    },
    email: { type: String, required: true, max: 80 },
    country: { type: String, required: true, max: 50 },
    password: { type: String, required: true },
    ip: { type: String },
    currency: { type: String },
    internetProvider: { type: String },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    likedList: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    isAccountValidated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = model("User", userSchema);

module.exports = User;
