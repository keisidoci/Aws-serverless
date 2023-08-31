const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Category = require("../../models/categoryModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const requestBody = JSON.parse(event.body)
      const { name } = requestBody
  
      if (typeof name !== "string" || !/^[a-zA-Z]+$/.test(name)) {
       return {
          statusCode: 400,
          body: JSON.stringify({
            error:
              "Invalid category data. The name must be a string containing only characters.",
          }),
        }
      }
      const category = await Category.create(requestBody)
      return{
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(category),
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      }
    }
  }

