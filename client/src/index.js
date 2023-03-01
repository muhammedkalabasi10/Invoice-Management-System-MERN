import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/ProductSlice';
import { Provider } from 'react-redux';
import clientSlice from './slices/ClientSlice';
import invoiceSlice from './slices/InvoiceSlice';
import userSlice from './slices/UserSlice';
import { AuthContextProvider } from './components/Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store=configureStore({reducer:{
  products:productSlice.reducer,
  clients:clientSlice.reducer,
  invoices:invoiceSlice.reducer,
  user:userSlice.reducer
}})

root.render(
  <Provider store={store}>
        <AuthContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
