const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Category = require("../../models/categoryModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const categoryId = event.pathParameters.id;
      const category = await Category.findByIdAndDelete(categoryId);
  
      if (category.deletedCount === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Category not found" }),
        }
      }
  
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(category),
      }
    } catch (err) {
      return{
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  };