const mongoose = require("mongoose")

const productCategorySchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("productCategory", productCategorySchema)
