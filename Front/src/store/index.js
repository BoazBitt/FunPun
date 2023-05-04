import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlicer";
import mobileReducer from "./mobileSlice";
import modalReducer from './modalSlicer'

const store = configureStore({
    reducer : {auth: authReducer.reducer,
               mobile:mobileReducer.reducer,
               modal:modalReducer.reducer
              }
});

export default store;