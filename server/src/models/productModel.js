const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    typology: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
)
module.exports = mongoose.model("Product", productSchema)
