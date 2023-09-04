const AWS = require('aws-sdk');
require('dotenv').config();
const { validateInput } = require("../../functions/functions");

const cognitoService = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event, context) => {
  try {
    const isValid = validateInput(event.body);
    if (!isValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid input" }),
      };
    }

    const { email, password } = JSON.parse(event.body);
    const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

    const params = {
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const response = await cognitoService.adminInitiateAuth(params).promise();

    if (!response.AuthenticationResult || !response.AuthenticationResult.IdToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Authentication failed" }),
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Success', token: response.AuthenticationResult.IdToken }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
  } catch (error) {
    console.error(error); 
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
