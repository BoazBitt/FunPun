import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Speech2TextMobile.module.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import on from '../assets/images/on-removebg-preview.png';
import off from '../assets/images/off-removebg-preview.png';
import Container from '../container/Container';
import { useDispatch, useSelector } from "react-redux";
import updateScore from '../../functions/updateScore';
import Confetti from 'react-confetti'





const Speech2TextMobile = props => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.Token)
  const [myConffeti, setConffeti] = useState(false)
  const { sentences } = props
  const [next, setNext] = useState(2);
  const [isVisible, setIsvisible] = useState(false);
  const [offCounter, setOffCounter] = useState(5);
  const [onCounter, setOnCounter] = useState(3);



  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  const clickHandler = () => {
    const interval = setInterval(() => {
      setOffCounter(prevCounter => prevCounter - 1);
    }, 1000);

    setTimeout(() => {
      setIsvisible(true);
      setOffCounter(5);
      clearInterval(interval);
    }, 5000);
  };

  useEffect(() => {
    let interval;
    if (isVisible) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      interval = setInterval(() => {
        setOnCounter(prevCounter => prevCounter - 1);
      }, 1000);
      setTimeout(() => {
        SpeechRecognition.stopListening();
        setOffCounter(5)
        setOnCounter(3)
        clearInterval(interval);
        setIsvisible(false);
      }, 3000);
    }
  }, [isVisible]);

  useEffect(() => {

    if (transcript.toLowerCase().includes(sentences[next].content.toLowerCase())) {
      setConffeti(prev => !prev)
      setTimeout(async () => {
        setConffeti(prev => !prev)
        resetTranscript()
        if (next === sentences.length - 2) {
          setNext(0)

          if (isLogin) {
            const response = await updateScore(user.user, { game: 'Speech', type: 100 }, dispatch, token)
            if (response === 200) navigation('/')
          }
          else {
            navigation('/')
          }
        }
        setNext(prev => prev + 2)




      }, 2000);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript])


  // useEffect(()=>{alert(offCounter)},[offCounter])



  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support Speech Recognition.</div>;
  }

  return (
    <Container color={"#29215A"}>
      <div className={classes.container}>
        {myConffeti && <Confetti tweenDuration={1} />}
        <div className={classes.instruction}>

          <h1>מה התרגום של המילה {' '}<span>{sentences[next + 1].content}</span> באנגלית</h1>
        </div>
        <div className={classes.record}>

          {!isVisible ? (
            <div className={classes.off}>

              <div className={classes.offCounter}>
                {offCounter !== 5 && <div> הקלטה מתחילה בעוד: {offCounter}</div>}

              </div>
              <div className={classes.image}>
                <img onClick={clickHandler} src={off} alt='off' />
              </div>
              <div className={classes.btn}>
                {transcript && <button onClick={resetTranscript}>אפס</button>
                }
              </div>
            </div>
          ) : (
            <div className={classes.on}>
              <div>
                <div className={classes.onCounter}>הקלט עכשיו! <br /> {onCounter}</div>
              </div>
              <div className={classes.image}>
                <img src={on} alt='on' />
              </div>
            </div>
          )}

        </div>
        <div className={classes.transcript}>
          <p> {transcript}:תשובה</p>
        </div>
      </div>
    </Container>

  );
};

export default Speech2TextMobile;
// if (navigator.mediaDevices) {
//   navigator.getUserMedia({ audio: true }).then(() => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true });
//   })
//     .catch((err) => {
//       console.error("Error Accessing microphone", err)
//       alert("Error Accessing microphone")
//     })
// }
// else {
//   console.error("getUserMEdia not supported on this browser")

// }