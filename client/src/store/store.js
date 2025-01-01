import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";


const logger = createLogger();

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
