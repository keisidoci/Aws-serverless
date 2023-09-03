require('dotenv').config(); 
const AWS = require('aws-sdk');

const awsConfig = {
  region: 'eu-central-1',
  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolClientId: process.env.COGNITO_APP_CLIENT_ID,
  },
};

module.exports = awsConfig;