import React from 'react'
import classes from './Modal.module.scss'
import { Animated } from 'react-animated-css';
import Login from '../overlays/LoginModal';
import SignUpModal from '../overlays/SignUpModal';
import AboutModal from '../overlays/AboutModal';
import ContactUsModal from '../overlays/ContactUsModal';
import MessageModal from '../overlays/MessageModal';
import SchoolModal from '../overlays/SchoolModal';
import { useSelector } from 'react-redux';


const Modal = () => {
    const myModal = useSelector(state=>state.modal)
    console.count('model')
    return (
        <div className={classes.back}>
            <Animated animationIn="zoomIn"
                animationOut="zoomOut"
                isVisible={true}>
                {myModal.modalType === 'Login' && <Login />}
                {myModal.modalType === 'SignUp' && <SignUpModal />}
                {myModal.modalType === 'About' && <AboutModal />}
                {myModal.modalType === 'Contact' && <ContactUsModal />}
                {myModal.modalType === 'School' && <SchoolModal />}
                {myModal.modalType === 'Message' && <MessageModal message={myModal.modalArgs} />}
            </Animated>

        </div>


    );
}

export default Modal;
