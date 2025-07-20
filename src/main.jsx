
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </BrowserRouter>
    </Provider>
)
