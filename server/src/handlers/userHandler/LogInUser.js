const AWS = require('aws-sdk');
require('dotenv').config();
const cognito = new AWS.CognitoIdentityServiceProvider()

module.exports.handler = async (event, context) => {

  console.log(JSON.stringify(event));
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, password } = JSON.parse(event.body);
    console.log('Email ', email )
    console.log('Password', password);

    const authParams = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    console.log('Before Cognito authentication');
    const authResult = await cognito.adminInitiateAuth(authParams).promise();
    console.log('After Cognito authentication');

    const accessToken = authResult.AuthenticationResult.AccessToken;
    const params = {
      AccessToken: accessToken,
  };


  if (!authResult.AuthenticationResult || !authResult.AuthenticationResult.IdToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Authentication failed" }),
    };
  }
  
    try{
      const result = await cognito.getUser(params).promise();
      return{
          statusCode: 200,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
          body: JSON.stringify({status: "success", result})
      }
  } catch (authError) {
      console.log("Authentication error", authError);
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: "Invalid or expired token" }),
      };
}
  } catch (error) {
    console.error(error); 
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
