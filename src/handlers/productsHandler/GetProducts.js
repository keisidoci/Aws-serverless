const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Product = require("../../models/productModel");

module.exports.handler = async (event, context) => {
    try {
        // context.callbackWaitsForEmptyEventLoop = false
      await connectDatabase();
      const allProducts = await Product.find({});
      return {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        statusCode: 200,
        body: JSON.stringify(allProducts)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      }; 
    }
};
