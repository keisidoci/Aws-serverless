const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Review = require("../../models/reviewModel");

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const reviews = await Review.find({})
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 201,
        body: JSON.stringify(reviews),
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  }
  