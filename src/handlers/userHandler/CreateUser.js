const AWS = require('aws-sdk');
const awsConfig = require('./cognito-config.js');
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { name, surname, email, password, username } = requestBody;

    // Create a new Cognito user
    const params = await cognito.adminCreateUser( {
      ClientId: awsConfig.cognito.userPoolClientId,
      Username: username,
      Password: password,
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
    }).promise()

    const cognitoUser = await cognitoIdentityServiceProvider.signUp(params).promise();
    
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        },
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
