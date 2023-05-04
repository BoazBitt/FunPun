import React from 'react'
import classes from './overlay.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlicer";
import { useState, useEffect } from 'react';
import getUserInfo from '../../functions/getUserInfo';
import getSentences from '../../functions/getSentences'
import ModalContent from './ModalContent';
import Password from './SharedComponents/Password';
import Social from './SharedComponents/Social';
import Switches from './SharedComponents/Switches';
import Closer from './SharedComponents/Closer';
import Exit from './SharedComponents/Exit';
import { modalActions } from '../../store/modalSlicer';
import { ClipLoader } from 'react-spinners'






const LoginModal = () => {
    const type = useSelector(state => state.modal.modalType)
    const dispatch = useDispatch();
    const [data, setData] = useState({ username: "", password: '' })
    const [loginData, setloginData] = useState(null);
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState('')




    const signInHandler = event => {
        event.preventDefault();
        if (!data.username) {
            alert('Please enter username');
            return;
        }
        if (!data.password) {
            alert('Please enter password');
            return;
        }
        setLoader(true)

        setloginData(data);
    }
    useEffect(() => {
        if (loginData) {
            // getUserInfo(loginData).then((data) => {
            //     dispatch(authActions.login(data));
            //     dispatch(modalActions.closeModal())
            //     getSentences(data.user.user).then((sentences)=>{
            //         console.log('sentences',sentences)
            //         dispatch(authActions.setSentences(sentences))
            //     })

            // })
            getUserInfo(loginData)
                .then((data) => {
                    console.log(data)
                    dispatch(authActions.login(data));
                    dispatch(modalActions.closeModal())
                    getSentences(data.user.user)
                        .then((sentences) => {
                            dispatch(authActions.setSentences(sentences))
                            setLoader(false)
                            setErr('')
                        })
                        .catch((error) => {
                            console.error('Error fetching sentences:', error);
                        });
                })
                .catch((error) => {
                    dispatch(modalActions.closeModal())
                    dispatch(modalActions.openModal({ modalType: 'Login', modalArgs: null }))
                    setLoader(false)
                    setData({ username: "", password: '' })
                    setErr('שם משתמש או סיסמא לא נכונים')

                    console.error('Error fetching user info:', error);
                });

        }


    }, [loginData, dispatch])


    const onInputChange = (e, field) => {
        setData({ ...data, [field]: e.target.value })
    }


    return (

        <div dir="rtl" className={classes.content}>
            <Exit />
            <Switches type={type} />
            <div className={classes.header}>התחברות</div>
            <div style={{ color: 'red', padding: '5px' }}>{err}</div>
            <ModalContent className={type}>
                <input maxLength={20}
                    placeholder='שם משתמש'
                    type='text'
                    name='username'
                    value={data.username}
                    onChange={(e) => { onInputChange(e, 'username') }} />
                <Password
                    onInputChange={onInputChange}
                    input={'password'}
                    password={data.password}
                    place='סיסמא' />
            </ModalContent>
            <Social />

            <div className={classes.btns}>
                <Closer />
                <button onClick={signInHandler}>התחבר</button>
                <ClipLoader size={30} color={"#9ACD32"} loading={loader} speedMultiplier={1} />

            </div>

        </div>
    )
}

export default LoginModal;