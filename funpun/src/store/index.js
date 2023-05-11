import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlicer";
import mobileReducer from "./mobileSlice";
import modalReducer from './modalSlicer'



const store = configureStore({
    reducer: {
        auth: authReducer.reducer,
        mobile: mobileReducer.reducer,
        modal: modalReducer.reducer
    },
    preloadedState: {
        auth: {
            isAuthenticated: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).isAuthenticated : false,
            user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).user : null,
            Token: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).Token : "",
            sentences: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).sentences : null,
            points: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).points : 0,
            classrooms: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).classrooms : [],

        }
    }

});


store.subscribe(() => {
    const { auth } = store.getState()
    localStorage.setItem('auth', JSON.stringify(auth))
})
// const expiresIn = 60 * 60 * 1000; // 1 hour in milliseconds

// store.subscribe(() => {
//   const { auth } = store.getState();
//   const expirationTime = new Date().getTime() + expiresIn;
//   const authData = {
//     auth,
//     expirationTime,
//   };
//   localStorage.setItem("auth", JSON.stringify(authData));
// });

// function getAuthData() {
//     const authDataString = localStorage.getItem("auth");
//     if (!authDataString) {
//       return null;
//     }
  
//     const authData = JSON.parse(authDataString);
//     const currentTime = new Date().getTime();
  
//     if (currentTime > authData.expirationTime) {
//       localStorage.removeItem("auth");
//       return null;
//     }
  
//     return authData.auth;
//   }
  
export default store;