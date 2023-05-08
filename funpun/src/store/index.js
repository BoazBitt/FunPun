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
            classrooms: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).classrooms : []

        }
    }

});

store.subscribe(() => {
    const { auth } = store.getState()
    localStorage.setItem('auth', JSON.stringify(auth))
})

export default store;