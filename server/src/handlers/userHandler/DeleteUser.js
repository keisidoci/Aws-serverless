const AWS = require('aws-sdk');
const awsConfig = require('../../../cognito-config');
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  try {
    // Extract the user's sub (Cognito's unique user identifier) from the JWT token in the event
    const { sub } = event.requestContext.authorizer.claims;

    await cognitoIdentityServiceProvider.adminDeleteUser({
      UserPoolId: awsConfig.cognito.userPoolId,
      Username: sub, 
    }).promise();

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
