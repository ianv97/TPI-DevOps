import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

window.ApiUrl = 'http://localhost:3500/api/';

ReactDOM.render(<App />, document.getElementById('app'));
