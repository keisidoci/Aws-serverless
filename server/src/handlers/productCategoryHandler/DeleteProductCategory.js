const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const productCategoryModel = require("../../models/productCategoryModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const productCategoryId = event.pathParameters.id
      const productCategory = await productCategoryModel.findByIdAndDelete(productCategoryId)
      if (productCategory.deletedCount === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Product category not found" }),
        }
      }
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            },
        statusCode: 200,
        body: JSON.stringify(productCategory)
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  }
  