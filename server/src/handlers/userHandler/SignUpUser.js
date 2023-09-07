const AWS = require('aws-sdk');
require('dotenv').config(); 
const connectDatabase = require("../../database/dbConfig")
const User = require("../../models/userModel")
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: 'eu-central-1',
  params: {
    UserPoolId: process.env.COGNITO_USER_POOL_ID
  }
});

exports.handler = async (event) => {
  try {
    await connectDatabase()
    const requestBody = JSON.parse(event.body)
    const { name, surname, email, password, username} = requestBody

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      return {
        statusCode:400,
        body: JSON.stringify({ error: 'Name cannot contain numbers or special characters' })
      };
    }
    const surnameRegex = /^[a-zA-Z\s]+$/;
    if (!surnameRegex.test(surname)) {
      return {
        statusCode:400,
        body: JSON.stringify({ error: 'Surname cannot contain numbers or special characters' })
      };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            statusCode:400,
            body: JSON.stringify({ error: 'Invalid email adress' })
          };
    }
    const existingEmail = await User.findOne({email});
    if (existingEmail) {
        return {
            statusCode:400,
            body: JSON.stringify({ error: 'User with this email already registerd'}),
          };
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return {
            statusCode:400,
            body: JSON.stringify({ error: 'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long'}),
          };
    }
    const existingUser = await User.findOne({username});
    if (existingUser) {
        return {
            statusCode:400,
            body: JSON.stringify({ error: 'Username already in use'}),
          };
    }

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
    }

    const signUp = await cognito.signUp(params).promise();

    const newUser = new User({
        name,
        surname,
        email,
        password,
        username,
      });
  
      await newUser.save();
  
    return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        statusCode:201,
        body: JSON.stringify(newUser),
      };
} catch (error) {
    return {
        statusCode:500,
        body: JSON.stringify(error),
      };
}
}