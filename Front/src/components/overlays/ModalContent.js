import React from 'react'
import classes from './overlay.module.scss'


const ModalContent = props => {
    const { className } = props
    return (
        <div className={` ${classes[className]}`}>
            {props.children}
        </div>

    )
}

export default ModalContent