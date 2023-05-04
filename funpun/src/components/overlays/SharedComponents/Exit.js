import React from 'react'
import classes from '../overlay.module.scss'
import { useDispatch } from 'react-redux'
import { modalActions } from '../../../store/modalSlicer'



const Exit = () => {
    const dispatch = useDispatch();
    const click = () => {
        dispatch(modalActions.closeModal())
    }
    return (
        <div onClick={click} className={classes.exit}>X</div>
    )
}

export default Exit;