const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Product = require("../../models/productModel");

module.exports.handler = async (event, context) => {
    try {
       await connectDatabase()
      const productId = event.pathParameters.id
      const deleteProduct = await Product.findByIdAndDelete({ _id: productId })
  
      if (deleteProduct.deletedCount === 0) {
        return{
          statusCode: 404,
          body: JSON.stringify({error: "Product not found"})
        }
      }
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(deleteProduct)
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      }
    }
  }