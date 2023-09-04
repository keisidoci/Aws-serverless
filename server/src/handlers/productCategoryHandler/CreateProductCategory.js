const mongoose = require("mongoose");
require('dotenv').config();
const connectDatabase = require("../../database/dbConfig");
const productCategoryModel = require("../../models/productCategoryModel")
const productModel = require("../../models/productModel")
const categoryModel = require("../../models/categoryModel")

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase()
    const requestBody = JSON.parse(event.body)
    const { category, product } = requestBody

    const existingCategory = await categoryModel.findById(category)
    if (!existingCategory) {
       return{
        statusCode: 404,
        body: JSON.stringify({
          error: "Category not found with the provided ID.",
        }),
      }
    }

    const productsExist = await productModel.find({
      $and: [
        { _id: { $in: product } },
        { _id: { $exists: true } }, // Ensures that the product ID exists in the productModel.
      ],
    })

    // Check if the number of matched products is not equal to the number of provided product IDs.
    if (productsExist.length !== product.length) {
     return {
        statusCode: 404,
        body: JSON.stringify({
          error: "One or more products not found with the provided ID.",
        }),
      }
    }

    const productCategoryRelate = new productCategoryModel({
      product,
      category,
    })

    const savedRelation = await productCategoryRelate.save()
    return{
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        },
      statusCode: 200,
      body: JSON.stringify(savedRelation),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    }
  }
}