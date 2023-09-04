const AWS = require('aws-sdk');
require('dotenv').config(); 
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    return {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          },
        statusCode: 201,
        body: JSON.stringify({ message: `Email ${event.requestContext.authorizer.claims.email} has been authorized`}),
      };
  }