import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import classes from './StudentLearn.module.scss'
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'
import getStudentSentence from '../../functions/getStudentSentence';
import createStudent from '../../functions/createStudent'
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlicer";
import { useNavigate } from 'react-router-dom';





const StudentLearn = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const params = new URLSearchParams(location.search);
    const classroom = params.get('classroom');
    const classLevel = params.get('classLevel');
    const [studentInfo, setStudentInfo] = useState({ fullName: '', phone: '' })
    const [ready, setReady] = useState(false)
    const [loader, setLoader] = useState(false)

    const startLearn = () => {
        if (!studentInfo.fullName) {
            alert('שם חסר')
            return
        }
        if (!checkPhone(studentInfo.phone)) {
            alert('מספר טלפון לא תקין')
            return
        }
        setReady(true)
    }

    useEffect(() => {
        if (ready) {
            setLoader(prev => !prev)
            createStudent({ ...studentInfo, classroom: classroom }).then((data) => {
                getStudentSentence(classLevel).then((sentences) => {
                    console.log(sentences)
                    dispatch(authActions.setSentences(sentences))
                    navigation('/Learn',{ state: { classLevel: classLevel } })
                }).catch((err) => { console.error(err) })
            }).catch((err) => { console.error(err) })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready])

    const checkPhone = (phone) => {
        const pattern = /^05\d{8}$/;
        return pattern.test(phone);
    }


    const changeHandler = (e, key) => {
        setStudentInfo({ ...studentInfo, [key]: e.target.value })


    }




    return (
        <Container className={classes.contentHeader} color={"#29215A"}>
            <div className={classes.Student}>
                <div className={classes.enterInfo}>
                    <label >הכנס שם</label>
                    <input dir='rtl'
                        placeholder='שם'
                        value={studentInfo.fullName}
                        type='text'
                        onChange={(e) => { changeHandler(e, 'fullName') }} />
                    <input dir='rtl'
                        maxLength={10}
                        placeholder='טלפון'
                        value={studentInfo.phone}
                        type='number'
                        onChange={(e) => { changeHandler(e, 'phone') }} />
                    <div className={classes.btns}>
                        <span onClick={startLearn}>התחל ללמוד</span>

                    </div>
                    <ClipLoader size={30} color={"#9ACD32"} loading={loader} speedMultiplier={1} />

                </div>
            </div>


        </Container >

    )
}

export default StudentLearn