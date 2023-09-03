const AWS = require('aws-sdk')
require('dotenv').config(); 

exports.handler = async (event) => {
  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const { sub } = event.requestContext.authorizer.claims;

    const requestBody = JSON.parse(event.body);
    const { name, surname, email, password } = requestBody;

    const attributeUpdates = [];

    if (name) {
      attributeUpdates.push({
        Name: 'name',
        Value: name,
      });
    }

    if (surname) {
      attributeUpdates.push({
        Name: 'family_name',
        Value: surname,
      });
    }

    if (email) {
      // Check if the new email is already taken
      const existingEmail = await cognitoIdentityServiceProvider
        .adminGetUser({
          UserPoolId: process.env.COGNITO_USER_POOL_ID, 
          Username: sub, 
        })
        .promise();

      if (existingEmail && existingEmail.UserAttributes.find((attr) => attr.Name === 'email').Value !== email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Email is already in use' }),
        };
      }

      attributeUpdates.push({
        Name: 'email',
        Value: email,
      });
    }

    if (password) {
      attributeUpdates.push({
        Name: 'password',
        Value: password,
      });
    }

    await cognitoIdentityServiceProvider
      .adminUpdateUserAttributes({
        UserPoolId: process.env.COGNITO_USER_POOL_ID, 
        Username: sub, 
        UserAttributes: attributeUpdates,
      })
      .promise();

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
      body: JSON.stringify({ message: 'User updated successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
