import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isMobile: false, 
};

const mobileSlice = createSlice(
    {
        name: "mobile",
        initialState,
        reducers: {
            setMobile(state) {
                state.isMobile = true;
            }
        }
    }
)

export const mobileActions = mobileSlice.actions;
export default mobileSlice;