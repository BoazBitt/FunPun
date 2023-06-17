import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false, user: {
        first_name: null,
        last_name: null,
        userLevel: null,
    }, Token: "", sentences: null, points: 0, classrooms: []
};


const authSlice = createSlice(
    {
        name: "authentication",
        initialState,
        reducers: {
            login(state, action) {
                state.isAuthenticated = true;
                state.Token = action.payload.token;
                state.user = action.payload.user;
                if (action.payload.user.points) {
                    state.points = action.payload.user.points;             
                }
            },
            logout(state) {

                return initialState;
            },
            setUser(state,action){
                state.user = action.payload;
                if (action.payload.user.points) {
                    state.points = action.payload.user.points;             
                }
            },

            setSentences(state, action) {
                state.sentences = action.payload;
            },
            setClassrooms(state, action) {
                state.classrooms = action.payload;
            }

        }
    }
);

export const authActions = authSlice.actions;
export default authSlice;