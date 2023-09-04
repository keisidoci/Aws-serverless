const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Product = require("../../models/productModel");

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const { page, limit } = event.queryStringParameters || {} 
      const skip = (parseInt(page) || 1 - 1) *(parseInt(limit)|| 10)
      const allProducts = await Product.find()
        .skip(skip)
        .limit((parseInt(limit) || 10))
        .populate("reviews")
  
        return {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
      
          },
            statusCode: 200,
            body: JSON.stringify(allProducts,null, 2),
          }
    } catch (error) {
      return{
        statusCode: 500,
        body: JSON.stringify(error)
      }
    }
  }
  
