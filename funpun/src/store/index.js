import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlicer";
import mobileReducer from "./mobileSlice";
import modalReducer from './modalSlicer'
import checkTime from "../functions/checkTime";



const store = configureStore({
    reducer: {
        auth: authReducer.reducer,
        mobile: mobileReducer.reducer,
        modal: modalReducer.reducer
    },
    preloadedState: {
        auth: {
            
            isAuthenticated: localStorage.getItem('auth') && checkTime() ? JSON.parse(localStorage.getItem('auth')).isAuthenticated : false,
            user: localStorage.getItem('auth') && checkTime() ? JSON.parse(localStorage.getItem('auth')).user : null,
            Token: localStorage.getItem('auth')&& checkTime() ? JSON.parse(localStorage.getItem('auth')).Token : "",
            sentences: localStorage.getItem('auth') && checkTime()? JSON.parse(localStorage.getItem('auth')).sentences : null,
            points: localStorage.getItem('auth') && checkTime()? JSON.parse(localStorage.getItem('auth')).points : 0,
            classrooms: localStorage.getItem('auth') && checkTime()? JSON.parse(localStorage.getItem('auth')).classrooms : [],
        }
    }

});


// store.subscribe(() => {
//     const { auth } = store.getState()
//     localStorage.setItem('auth', JSON.stringify(auth))
// })
const expiresIn = 30*60*1000;

store.subscribe(() => {
  const { auth } = store.getState();
  const expirationTime = new Date().getTime() + expiresIn;
  localStorage.setItem("auth", JSON.stringify(auth));
  localStorage.setItem("time", expirationTime);
});


  
export default store;