import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";

import $ from "jquery";

import Popper from "popper.js";

import "bootstrap/dist/js/bootstrap.bundle.min";

import * as serviceWorker from './serviceWorker';
ReactDOM.render(

  <Provider  store={store}>
  <App />
  
   </Provider>,
  document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();