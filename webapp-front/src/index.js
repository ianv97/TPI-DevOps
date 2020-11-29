import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

window.ApiUrl = process.env.REACT_APP_API_URL;
console.log(process.env);

ReactDOM.render(<App />, document.getElementById('app'));
