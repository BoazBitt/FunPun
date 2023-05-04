import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isModalOpen: false,
    modalType: '',
    modalArgs: null

};

const modalSlice = createSlice(
    {
        name: "modal",
        initialState,
        reducers: {
            openModal(state, action) {
                state.isModalOpen = true;
                state.modalType = action.payload.modalType;
                state.modalArgs = action.payload.modalArgs;
            }
            ,
            closeModal(state) {
                state.isModalOpen = false;
                state.modalType = '';
                state.modalArgs = null;
            },
        

    }
}
)

export const modalActions = modalSlice.actions;
export default modalSlice;
