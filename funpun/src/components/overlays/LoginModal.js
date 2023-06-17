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
        const fetchData = async () => {
            if (loginData) {
                const userData = await getUserInfo(loginData);
                dispatch(authActions.login(userData));
                dispatch(modalActions.closeModal())
                const fetchSentnce = await getSentences(userData.user.user)
                dispatch(authActions.setSentences(fetchSentnce))
                setLoader(prev =>!prev)
                setErr('')
        
            }

        }
        fetchData()



    }, [loginData, dispatch])


    const onInputChange = (e, field) => {
        setData({ ...data, [field]: e.target.value })
    }
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            signInHandler(event);
        }
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
                    handleKeyDown={handleKeyDown}
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