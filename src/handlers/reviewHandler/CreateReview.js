const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Review = require("../../models/reviewModel");
const Product = require("../../models/productModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const requestBody = JSON.parse(event.body)
      const { rating, productId } = requestBody
      
      if (rating < 1 || rating > 5) {
       return{
        statusCode: 400,
          body: JSON.stringify({
            error: "Invalid product data. Rating must be between 1 - 5 "
          })
       }
      }
      const review = await Review.create({ rating })
      const product = await Product.findById(productId);
  
      if (!product) {
        return{
          statusCode: 404,
          body: JSON.stringify({ error: "Product not found" }),
        }
      }
  
      product.reviews.push(review); // Link the review to the product
      await product.save(); // Save the updated product with the new review
    
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 201,
        body: JSON.stringify({ review, product }),
      }
    } catch (err) {
      return{
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  }