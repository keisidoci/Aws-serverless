const AWS = require('aws-sdk');
require('dotenv').config(); 
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();


module.exports.handler = async (event) => {
  try {

    const userList = await cognitoIdentityServiceProvider
      .listUsers({
        UserPoolId: process.env.COGNITO_USER_POOL_ID, 
      })
      .promise();

      if (!userList.Users || userList.Users.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'No users found' }),
        };
      }

    const users = userList.Users.map((user) => {
      return user.Attributes.reduce((attributes, attribute) => {
        attributes[attribute.Name] = attribute.Value;
        return attributes;
      }, {});
    });

    if (users.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No users found' }),
      };
    }

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
