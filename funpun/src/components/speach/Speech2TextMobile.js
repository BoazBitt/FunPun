import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Speech2TextMobile.module.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import on from '../assets/images/on-removebg-preview.png';
import off from '../assets/images/off-removebg-preview.png';
import Container from '../container/Container';


const Speech2TextMobile = props => {
  const navigation = useNavigate();
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
      SpeechRecognition.startListening({ continuous: true });
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
      setTimeout(() => {
        alert("yes")
        resetTranscript()
        if (next === sentences.length - 2) {
          alert("end")
          setNext(0)

          navigation('/')

        }
        else {
          setNext(prev => prev + 2)
        }

      }, 1500);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript])


  // useEffect(()=>{alert(offCounter)},[offCounter])

  useEffect(() => {
    console.log("off:", offCounter)
    console.log("on:", onCounter)
  }, [onCounter, offCounter])

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support Speech Recognition.</div>;
  }

  return (
    <Container color={"#29215A"}>
      <div className={classes.container}>
        <div className={classes.instruction}>
          : "איך אומרים באנגלית את המילה "{sentences[next + 1].content}
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
                <button onClick={resetTranscript}>Reset</button>
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
          <p> Transcript:{transcript}</p>
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