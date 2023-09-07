const AWS = require('aws-sdk');
require('dotenv').config(); 
const connectDatabase = require("../../database/dbConfig")
const cognito = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'eu-central-1',
    params: {
      UserPoolId: process.env.COGNITO_USER_POOL_ID
    }
  });
const mongoose = require('mongoose');
const User = require("../../models/userModel");

module.exports.updateUser = async (event) => {
    await connectDatabase();
    
    const {username, name, surname, email} = event;
    const params = {
        ClientId: process.env.COGNITO_APP_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: 'name',
                Value: name
            },
            {
              Name: 'family_name',
              Value: surname
           },
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'preferred_username',
                Value: username
            },
        ]
    };
    
    try {
        await cognito.adminUpdateUserAttributes(params).promise();
        
        await User.updateOne({username}, {$set: {name, surname, email}});
        
        return {success: true};
    } catch (error) {
        return {success: false, error: error.message};
    }
};