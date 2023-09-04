const AWS = require('aws-sdk');
require('dotenv').config(); 
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();


module.exports.handler = async (event) => {
  try {
    const { sub } = event.requestContext.authorizer.claims;

    const userData = await cognitoIdentityServiceProvider
      .adminGetUser({
        UserPoolId: process.env.COGNITO_USER_POOL_ID, 
        Username: sub, 
      })
      .promise();

      if (!userData || !userData.UserAttributes) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'User not found' }),
        };
      }

    const userAttributes = userData.UserAttributes.reduce((attributes, attribute) => {
      attributes[attribute.Name] = attribute.Value;
      return attributes;
    }, {});

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
      body: JSON.stringify(userAttributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
