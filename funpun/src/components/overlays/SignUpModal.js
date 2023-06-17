/* eslint-disable no-unused-vars */
import React from 'react'
import classes from './overlay.module.scss'
import { useState, useEffect } from 'react';
// import signUpUser from '../../functions/signUpUser'
import { useNavigate } from 'react-router-dom';
import { modalActions } from '../../store/modalSlicer';
import ModalContent from './ModalContent';

import Cities from '../../Data/Cities'
import Switches from './SharedComponents/Switches';
import Social from './SharedComponents/Social';
import Password from './SharedComponents/Password';
import Input from './SharedComponents/Input';
import Closer from './SharedComponents/Closer';
import { useSelector, useDispatch } from 'react-redux';
import Exit from './SharedComponents/Exit';
import getAllUsers from '../../functions/getAllusers'

const SignUpModal = props => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    city: '',

  })
  const type = useSelector(state => state.modal.modalType)
  const [signupData, setSignUpData] = useState(null)
  const filteredCities = Cities.filter(city => city.startsWith(formData.city));
  const [allUsrs , setAllUsrs] = useState(null)


  useEffect(()=>{
    const getAll = async () =>{
      const allUsers = await getAllUsers();
      setAllUsrs(allUsers)
    }
    getAll()


  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    console.log(allUsrs)
  },[allUsrs])
  const checkConflicts = () =>{
    if (allUsrs){
    
      for (let i = 0; i < allUsrs.length; i++) {
        if (allUsrs[i].username === formData.username) {
          return 'Username already exists';
        }
        if (allUsrs[i].email === formData.email) {
          return 'Email already exists';
        }
      }
      return null;
    }
  }


  const SignUpHandler = event => {
    event.preventDefault();
    for (let key in formData) {
      if (formData[key] === '') {
        alert(`Please fill ${key} field`)
        return;
      }
    }
    if (!formData.city || !(Cities.includes(formData.city.trim()))) { alert('Please enter exiting city'); return; }
    if (formData.password !== formData.password2) { alert('Passwords do not match'); return; }
    const error = checkConflicts();
    if (!error) alert(error)

    setSignUpData(formData)
  }

  useEffect(() => {
    if (signupData) {
      dispatch(modalActions.closeModal())
      navigation('/Test', { state: { signupData: signupData } })
    }
  }, [signupData, navigation, dispatch])

  const [isValid, setIsValid] = useState(true)
  const onInputChange = (e, input, isValid = true) => {
    if (!isValid) {


    }
    setFormData({ ...formData, [input]: e.target.value })
  }




  return (
    <div dir="rtl" className={classes.content}>
      <Exit />
      <Switches type={props.type} />
      <div className={classes.header}>הרשמה</div>
      <ModalContent className={type}>
        <Input name='username' place='שם משתמש' value={formData.username} onInputChange={onInputChange} input='username' />
        <Input name='email' place='דואר אלקטרוני' value={formData.email} onInputChange={onInputChange} input='email' />
        <div className={classes.name}>
          <Input name='firstname' place='שם פרטי' value={formData.first_name} onInputChange={onInputChange} input='first_name' />
          <Input name='lastname' place='שם משפחה' value={formData.last_name} onInputChange={onInputChange} input='last_name' />
        </div>

        <div className={classes.gender}>
          <label>זכר</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={(event) =>
              setFormData((prevState) => ({ ...prevState, gender: event.target.value }))
            }
          />
          <label>נקבה</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={(event) =>
              setFormData((prevState) => ({ ...prevState, gender: event.target.value }))
            }
          />
        </div>



        <Password
          onInputChange={onInputChange}
          input={'password'}
          password={formData.password}
          place='סיסמא' />
        <Password
          onInputChange={onInputChange}
          input={'password2'}
          password={formData.password2}
          place='אימות סיסמא' />
        {/* <Input name='city' place='עיר מגורים' value={formData.city} onInputChange={onInputChange} input='city' /> */}
        <input list='cities' placeholder='עיר מגורים' value={formData.city} onChange={(e) => { onInputChange(e, 'city') }} />
        <datalist id='cities'>
          {filteredCities.map((city) => (
            <option value={city} key={city} />
          ))}
        </datalist>

      </ModalContent>
      <Social />
      <div className={classes.btns}>
        <Closer />
        <button onClick={SignUpHandler}>הירשם</button>
      </div>
    </div>
  )
}

export default SignUpModal;