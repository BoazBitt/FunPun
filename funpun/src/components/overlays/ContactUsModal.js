import classes from './overlay.module.scss'
import Closer from './SharedComponents/Closer'
import React, { useEffect, useState } from 'react'
import Input from './SharedComponents/Input'
import { useDispatch } from 'react-redux'
import { modalActions } from '../../store/modalSlicer'
import Exit from './SharedComponents/Exit'



const ContactUsModal = () => {
  const dispatch = useDispatch();

  const [contactData, setContactData] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState("")

  const onInputChange = (e, input) => {
    setContactData({ ...contactData, [input]: e.target.value })
  }

  const sendContactData = () => {
    if(!contactData.name||!contactData.email||!contactData.message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      setError("אנא מלאו את כל השדות")
      return
    }

    dispatch(modalActions.openModal(
      { modalType: 'Message',
        modalArgs:
          {Header:'הפנייה נשלחה',
          content:"פנייתך נרשמה בהצלחה ניצור איתך קשר במהרה תודה"
        } 
      }
      )

    )
    setTimeout(() => {
      dispatch(modalActions.closeModal())
      
    }, 5000);


  }
  useEffect(()=>{
    setError('')
  },[contactData])

 

  return (
    <div dir="rtl">
      <Exit/>
      
        <div className={classes.content}>
          <div className={classes.header}>צרו איתנו קשר</div>
          <div className={classes.incontent}>
            <div className={classes.contactUs}>
              <Input name='name' place='שם מלא' value={contactData.name} onInputChange={onInputChange} input='name' />
              <Input name='email' place='דואר אלקטרוני' value={contactData.email} onInputChange={onInputChange} input='email' />
              <textarea value={contactData.message} onChange={(e) => { onInputChange(e, 'message') }} placeholder='שלח לנו הודעה' />
            </div>
          </div>
          <span style={{textAlign:'center',color:'red'}}>{error}</span>
          <div className={classes.btns}>
            <Closer />
            <button onClick={sendContactData}>שלח</button>
          </div>
        </div>



    </div>

  )
}
export default ContactUsModal