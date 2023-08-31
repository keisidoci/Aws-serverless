const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Product = require("../../models/productModel");
const Review = require("../../models/reviewModel")

module.exports.handler = async (event, context) => {
    try {
    await connectDatabase();
      const productId = event.pathParameters.id
      const oneProduct = await Product.findById(productId).populate(
        "reviews"
      )
      if (!oneProduct) {
       return {
        statusCode: 404,
        body: JSON.stringify({error: "Product not found"})
       }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(oneProduct)
      }
    } catch (err) {
      return{
        statusCode: 500,
        body: JSON.stringify(err)
      }
    }
  }