const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const productCategoryModel = require("../../models/productCategoryModel")
const Category = require("../../models/categoryModel")
const Product = require("../../models/productModel")

module.exports.handler = async (event, context) => {
    try {
      console.log("Received event:", JSON.stringify(event))
      await connectDatabase()
      const categoryId = event.pathParameters.id
      console.log("Extracted categoryId:", categoryId)
      const productCategory = await productCategoryModel.findOne({category: categoryId})
        .populate("category", "name") 
        .populate("product")
        console.log("Populated productCategory:", JSON.stringify(productCategory))
      console.log()
      if (!productCategory) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "ProductCategory not found" }),
        }
      } console.log("ProductCategory Not found")
       return{
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            },
          statusCode: 200,
          body: JSON.stringify(productCategory),
        }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  }