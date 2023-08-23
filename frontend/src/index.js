import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {
  environment
} from "./environment";

// interceptors start
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use(
  request =>{
    request.headers.common['Access-Control-Allow-Origin'] = '*';
    if(request.url.startsWith(environment.production.apiEndpoint + '/api/')===true){
      const user = JSON.parse(localStorage.getItem("user"));
    request.headers.common.Authorization = `Bearer ${user.token}`
    }
    return request;
  },
  error =>{
    return Promise.reject(error)
  }
);
// interceptors end

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
