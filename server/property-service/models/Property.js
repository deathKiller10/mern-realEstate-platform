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

  bhk: { type: Number, required: true },
  area: { type: Number, required: true },

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
  buyer: {
    type: String,
    default: null, // This will store the buyer's email after payment
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{
  timestamps: true,
  optimisticConcurrency: true
}
);

module.exports = mongoose.model("Property", propertySchema);