const AWS = require('aws-sdk');
require('dotenv').config(); 
const cognito = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'eu-central-1',
  })

module.exports.handler = async (event) => {

    if (!event.body) {
        return{ messsage: 'Request body is missing.'};
    }

    const { email, code } = JSON.parse(event.body);
    console.log(JSON.parse(event.body))
    const params = {
        ClientId: process.env.COGNITO_APP_CLIENT_ID, 
        ConfirmationCode: code,
        Username: email
    };

    try {
        await cognito.confirmSignUp(params).promise();
        return{
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify({status: "success"})
        };
    } catch (error) {
        return{
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify({status: "error"})
        };
    }
};