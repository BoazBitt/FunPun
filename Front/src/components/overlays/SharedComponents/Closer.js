import React from 'react'
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../store/modalSlicer'




const Closer = () => {
    const dispatch = useDispatch();
    const click = ()=>{
        dispatch(modalActions.closeModal())
    }
    return (
        <button onClick={click}>סגור</button>
    )
}

export default Closer