import React, { useState, useEffect } from 'react';
// import classes from './Speech2Text.module.scss';
import Container from '../container/Container'
import SpeechRecognize from './SpeechRecognize';
import Speech2TextMobile from './Speech2TextMobile'
// import { useDispatch } from 'react-redux';
// import { modalActions } from "../../store/modalSlicer"
import { useLocation } from 'react-router-dom';
import DUMMY from '../../Data/DUMMY_WORDS'

// const mobileInstruct = 'על מנת להשלים את התרגול בעל פה יש ללחוץ על הכפתור האדום ותתבצע ספירה לאחור בסיומה יש להגיד את המילה בכל חזק וברור במידה והמילה נאמרה נכון יופיע כפתור למעבר למילה הבאה בסיום התרגול תועברו לדף הבית ויחידת הלימוד תושלם בהצלחה!'
// const pcInstruct = 'על מנת להשמיע את המילים יש ללחוץ ברצף על הכפתור במסך הכפתור ישתנה לצבע ירוק ויש לומר בקול חזק וברור את המילה כאשר תאמרו את המילה הנכונה יופיע כפתור להמשיך למילה הבאה בסיום התרגול תועברו לדף הבית ויחידת הלימוד תושלם בהצלחה!'
// useEffect(()=>{
//   dispatch(modalActions.openModal({Header:'הוראות',content:mobileInstruct}))
// },[])

// className={classes.container}

const SpeechRecognitionComponent = () => {
  // const dispatch = useDispatch()
  const { state } = useLocation();
  const sentences = state ? state.sentences : DUMMY;
  console.log("initial", sentences)

  const [isMobile, setisMobile] = useState(false)
  const isTouchable = () => {
    const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    const isTablet = /ipad|android/.test(navigator.userAgent.toLowerCase()) && !/mobile/.test(navigator.userAgent.toLowerCase());
    return isMobile || isTablet;

  }

  // useEffect(() => {
  //   if (isMobile) {
  //     dispatch(modalActions.openModal({ Header: 'הוראות', content: mobileInstruct }))

  //   }
  //   else {
  //     dispatch(modalActions.openModal({ Header: 'הוראות', content: pcInstruct }))
  //   }
  // }, [isMobile])




  useEffect(() => {
    if (isTouchable()) {
      setisMobile(true)
    }
    else {
      setisMobile(false)
    }
  }, [])
  if (isMobile) {
    return <Container color={"#29215A"}>
      <Speech2TextMobile sentences={sentences}/>

    </Container>
  }

  return (
    <Container color={"#29215A"}>
      <SpeechRecognize sentences={sentences}/>


    </Container>
  );

};

export default SpeechRecognitionComponent;


// const appId = 'faaecb3a-792a-42ec-84a6-d5439e6dcf24';

