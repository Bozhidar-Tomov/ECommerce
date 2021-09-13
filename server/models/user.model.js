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
    name: {
      type: String,
      required: true,
      min: [6, "Name must be between 3 and 40 characters"],
      max: [81, " Name must be between 3 and 40 characters"],
    },

    email: { type: String, required: true, max: 80 },
    country: { type: String, required: true, max: 3 },
    password: { type: String, required: true },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
