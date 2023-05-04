import React, { useState } from 'react'
import Closer from './SharedComponents/Closer'
import classes from './overlay.module.scss'
import Password from './SharedComponents/Password';
import { useEffect } from 'react';
import Input from './SharedComponents/Input';
import ModalContent from './ModalContent';
import { ClipLoader } from 'react-spinners'
import TeacherLogin from '../../functions/TeacherLogin'
import TeacherSignUp from '../../functions/TeacherSignUp'
import { modalActions } from '../../store/modalSlicer';
import { useDispatch } from 'react-redux';
import Exit from './SharedComponents/Exit';
import Cities from '../../Data/Cities'
// import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlicer';
// import getClasses from '../../functions/getClasses';




const SchoolModal = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const [loader, setLoader] = useState(false)
  const [state, setState] = useState(false)
  const [dataIn, setDataIn] = useState({ username: "", password: '' })
  const [dataUp, setDataUp] = useState({
    first_name: '',
    last_name: '',
    school_name: '',
    username: '',
    password: '',
    password2: '',
    city: '',

  })
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setInputValue] = useState("");
  const filteredCities = Cities.filter(city => city.toLowerCase().startsWith(inputValue.toLowerCase()));

  
  const [formData, setFormData] = useState(null)

  // useEffect(() => {
  //   if (!formData) {
  //   }
  // }, [formData]);

  const onInChange = (e, field) => {
    setDataIn({ ...dataIn, [field]: e.target.value })
  }
  const onUpChange = (e, field) => {
    setDataUp({ ...dataUp, [field]: e.target.value })
  }

  const changeswitch = () => {
    setState(prev => !prev);
    setDataIn({ username: "", password: '' });
    setDataUp({
      first_name: '',
      last_name: '',
      school_name: '',
      username: '',
      password: '',
      password2: '',
      city: '',
    })
  }

  const clickhandler = (type) => {
    console.log(type)
    setLoader(prev => !prev)
    if (type === 'SignUp') {
      setFormData(dataUp)
    }
    if (type === 'Login') {
      setFormData(dataIn)

    }
  }

  useEffect(() => {
    if (formData) {
      if (state) {
        TeacherSignUp(formData).then((data) => {
          console.log(data)
          setLoader(prev => !prev)
          dispatch(modalActions.closeModal())
        })

      }
      else {
        TeacherLogin(formData).then((data) => {
          console.log(data)
          setLoader(prev => !prev)
          dispatch(authActions.login(data))
          dispatch(modalActions.closeModal())
        })

      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])


  return (
    <div dir="rtl" className={classes.content}>
      <Exit/>
      <div className={classes.btns}>
        <button onClick={changeswitch}>{!state ? 'SignUp' : 'Login'}</button>
      </div>
      {!state && <div>
        <div className={classes.header}>Login</div >
        <ModalContent className={'Login'}>
          <Input name='username' place='שם משתמש' value={dataIn.username} onInputChange={onInChange} input='username' />
          <Password
            onInputChange={onInChange}
            input={'password'}
            password={dataIn.password}
            place='סיסמא' />
        </ModalContent>
      </div>}
      {state && <div>
        <div className={classes.header}>Sign Up</div >
        <ModalContent className={'SignUp'}>
          <Input name='username' place='שם משתמש' value={dataUp.username} onInputChange={onUpChange} input='username' />

          <Password
            onInputChange={onUpChange}
            input={'password'}
            password={dataUp.password}
            place='סיסמא' />
          <Password
            onInputChange={onUpChange}
            input={'password2'}
            password={dataUp.password2}
            place='אימות סיסמא' />
          <Input name='firstname' place='שם פרטי' value={dataUp.first_name} onInputChange={onUpChange} input='first_name' />
          <Input name='lastname' place='שם משפחה' value={dataUp.last_name} onInputChange={onUpChange} input='last_name' />
          <Input name='school_name' place='בית ספר' value={dataUp.school_name} onInputChange={onUpChange} input='school_name' />
          <input list='cities' placeholder='עיר מגורים' value={dataUp.city} onChange={(e) => { onUpChange(e, 'city') }} />
        <datalist id='cities'>
          {filteredCities.map((city) => (
            <option value={city} key={city} />
          ))}
        </datalist>        </ModalContent>

      </div>}


      <div className={classes.btns}>
        <Closer />
        <button onClick={state ? () => { clickhandler('SignUp') } : () => { clickhandler('Login') }}>
          {state ? 'SignUp' : 'Login'}
        </button>
        <ClipLoader size={30} color={"#9ACD32"} loading={loader} speedMultiplier={1} />
      </div>
    </div>
  )
}

export default SchoolModal