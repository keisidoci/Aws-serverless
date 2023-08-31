const mongoose = require("mongoose")
require('dotenv').config()
const connectDatabase = require("../../database/dbConfig")
const Product = require("../../models/productModel")
const Category = require("../../models/categoryModel")
const ProductCategory = require("../../models/productCategoryModel")

module.exports.handler = async (event, context) => {
    try {
      await connectDatabase()
      const requestBody = JSON.parse(event.body)
      const { typology, description, categoryId } = requestBody

    if (typeof typology !== "string" || !/^[a-zA-Z ]+$/.test(typology)) {
      return ({
        statusCode: 400,
        body:
          JSON.stringify("Invalid product data. Typology must be a string containing only characters."),
      })
    }
    const category = await Category.findById(categoryId)
    if (!category) {
      return{ statusCode: 404,
        body: JSON.stringify("Category not found")
      }
    }
    const newProduct = await Product.create(requestBody)

    await ProductCategory.findOneAndUpdate(
      { category: category._id },
      { $push: { product: newProduct._id } },
      { upsert: true }
    )
      return{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
      },
        statusCode:200,
        body: JSON.stringify(newProduct)
      }
  } catch (err) {
    console.log(err)
    return{
      statusCode:500,
      body: JSON.stringify(err)
    }
  }
}