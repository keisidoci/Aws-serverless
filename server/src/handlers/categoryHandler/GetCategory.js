const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Category = require("../../models/categoryModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const categories = await Category.find({});
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(categories),
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  };
  