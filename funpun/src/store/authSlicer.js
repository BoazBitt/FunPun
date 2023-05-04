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
                if (action.payload.user.points) {
                    console.log("in if")
                    state.Token = action.payload.token;
                    state.user = action.payload.user;
                    state.points = action.payload.user.points;
                }
                else {
                    console.log("in else")
                    state.user = action.payload.user;
                    state.Token = action.payload.token;
                }

            },
            logout(state) {
                state.isAuthenticated = false;
                state.Token = "";
                state.user = "";
                state.userLevel = null;
                state.sentences = null;
                state.points = 0;
                state.classrooms = [];


            },
            setSentences(state, action) {
                state.sentences = action.payload;
            },
            setClassrooms(state, action) {
                console.log(action.payload)
                state.classrooms = action.payload;



            }

        }
    }
);

export const authActions = authSlice.actions;
export default authSlice;