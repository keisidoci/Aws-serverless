const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Review = require("../../models/reviewModel");

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const reviewId = event.pathParameters.id
      const review = await Review.findByIdAndDelete(reviewId)
  
      if (!review) {
        return{
          statusCode: 404,
          body: JSON.stringify({ error: "Review not found" }),
        }
      }
      
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(review),
      }
    } catch (err) {
      return{
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  };
  