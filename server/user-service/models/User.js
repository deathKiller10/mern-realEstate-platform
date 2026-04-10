const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["buyer", "owner", "admin"],
      default: "buyer"
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    wishlist: [{ type: String }]

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);