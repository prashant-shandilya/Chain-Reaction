import React from 'react';
import ReactDom from 'react-dom';
import {AppProvider} from './Context.js'
import App from './App.js'
ReactDom.render(
    <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
    ,document.getElementById('root'));