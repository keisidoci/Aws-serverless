const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Review = require("../../models/reviewModel");
const Product = require("../../models/productModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const reviewId = event.pathParameters.id
      const requestBody = JSON.parse(event.body)
      const { rating } = requestBody
  
      if (rating < 1 || rating > 5) {
        return {
            statusCode: 400,
            body: JSON.stringify("Rating should be between 1-5")
        }
    }
      const newReview = await Review.findByIdAndUpdate(reviewId, requestBody, {new: true});
      const product = await Product.findById(product.id);
      
      if (!product) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Product not found" }),
        }
      }
      
      product.reviews.push(newReview);
      await product.save();
      
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(newReview, product),
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  }