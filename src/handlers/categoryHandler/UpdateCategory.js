const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const Category = require("../../models/categoryModel")

module.exports.updateOneCategory = async (event, context) => {
    try {
        await connectDatabase()
      const categoryId = event.pathParameters.id;
      const requestBody = JSON.parse(event.body);
      const { name } = requestBody;
  
      if (typeof name !== "string" || !/^[a-zA-Z]+$/.test(name)) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error:
              "Invalid category data. The name must be a string containing only characters.",
          }),
        }
      }
  
      const newCategory = await Category.findByIdAndUpdate(categoryId, requestBody, { new: true });
      return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode: 200,
        body: JSON.stringify(newCategory),
      }
    } catch (err) {
      return{
        statusCode: 500,
        body: JSON.stringify(err),
      }
  };
}
  