const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["rent", "sale"],
    required: true
  },

  status: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available"
  },

  images: [
    {
      type: String
    }
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Property", propertySchema);