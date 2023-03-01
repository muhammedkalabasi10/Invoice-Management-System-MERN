import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './slices/ClientSlice';
import invoiceSlice from './slices/InvoiceSlice';
import productSlice from './slices/ProductSlice';
import userSlice from './slices/UserSlice';


export const store=configureStore({reducer:{
    products:productSlice.reducer,
    clients:clientSlice.reducer,
    invoices:invoiceSlice.reducer,
    user:userSlice.reducer
  }})