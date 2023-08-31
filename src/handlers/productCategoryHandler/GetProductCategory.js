const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const productCategoryModel = require("../../models/productCategoryModel")
const Product = require("../../models/productModel")
const Category = require("../../models/categoryModel")


module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const productCategory = await productCategoryModel.find()
        .populate("category")
        .populate("product")
        return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            },
          statusCode: 200,
          body: JSON.stringify(productCategory),
        }
      } catch (err) {
        return{
          statusCode: 500,
          body: JSON.stringify(err),
        }
    }
  }