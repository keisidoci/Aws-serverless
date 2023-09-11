import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { Auth } from "aws-amplify";

async function getToken() {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  return token;
}


axios.interceptors.request.use(async (request) => {
  const token = await getToken(); // Await the getToken() function
  request.headers.Authorization = token;
  return request;
});

axios.interceptors.response.use(async (response) => { 
  const token = await getToken(); // Await the getToken() function
  response.headers.Authorization = token;
  return response;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
