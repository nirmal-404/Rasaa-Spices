import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import contactSlice from "./admin/contact-slice/contactSlice"



const logger = createLogger();

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    userContacts: contactSlice,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
