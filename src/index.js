import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import 'babel-polyfill';
import 'whatwg-fetch';

require('es6-object-assign').polyfill();

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('app')
);
