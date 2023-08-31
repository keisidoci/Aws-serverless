const mongoose = require("mongoose")
require('dotenv').config()
const connectDatabase = require("../../database/dbConfig")
const Product = require("../../models/productModel")
const Category = require("../../models/categoryModel")
const ProductCategory = require("../../models/productCategoryModel")

module.exports.handler = async (event, context) => {
    try {
        await connectDatabase();
            const productId = event.pathParameters.id
            const requestBody = JSON.parse(event.body)
            const { typology } = requestBody
        
            if (typeof typology !== "string" || !/^[a-zA-Z ]+$/.test(typology)) {
              return{
                statusCode: 400,
                body: JSON.stringify({
                  error:
                  "Invalid produc data."
                })
              }
            }
        
            const oneProduct = await Product.findOneAndUpdate(
              { _id: productId },
              requestBody,
              {new: true}
            ).populate("reviews")
        
            if (!oneProduct) {
              return {
                statusCode: 404,
                body: JSON.stringify({error: "Product not found"})
              }
            }
        
            return{ 
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
              statusCode: 200,
              body: JSON.stringify(oneProduct)
            }
        
          } catch (err) {
            return{
              statusCode: 500,
              body: JSON.stringify(err)
            }
          }
  }