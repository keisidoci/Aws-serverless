const AWS = require('aws-sdk');
require('dotenv').config(); 
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  try {
    // Extract user signup data from the event
    const requestBody = JSON.parse(event.body);
    const { name, surname, email, password, username } = requestBody;

    // Create a new user in Cognito
    const params = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: 'name',
          Value: name,
        },
        {
          Name: 'family_name',
          Value: surname,
        },
        {
          Name: 'email',
          Value: email,
        },
      ],
    };

    const cognitoUser = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully', user: cognitoUser }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
