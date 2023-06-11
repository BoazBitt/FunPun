import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import on from '../assets/images/on-removebg-preview.png'
import off from '../assets/images/off-removebg-preview.png'
import classes from './SpeechRecognize.module.scss'

const SpeechRecognize = props => {
    const navigation = useNavigate();
    const { sentences } = props
    const [next, setNext] = useState(0);
    const [proceed, setProceed] = useState(false)
    const [listening, setListening] = useState(false);
    const [showImage, setShowImage] = useState(false);
    // const [audioClue, setAudioClue] = useState('');
    // useEffect(()=>{
    //     setAudioClue(`../assets/FronAudiotFiles/${sentences[next]}.mp3`)
    // },[next, sentences])

    const handleMouseDown = () => {
        setShowImage(true);
        setListening((prevState) => !prevState);
    };

    const handleMouseUp = () => {
        setShowImage(false);
        setListening((prevState) => !prevState);
    };


    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        if (listening) {
            console.log("Start Listening")
            SpeechRecognition.startListening({ continuous: true });
        } else {
            console.log("Stop Listening")
            SpeechRecognition.stopListening();
        }
    }, [listening,]);

    useEffect(() => {
        if (transcript.toLowerCase().includes(sentences[next].content.toLowerCase())) {
            SpeechRecognition.stopListening();
            setProceed(prev => !prev)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transcript])

    const proceedHandler = () => {
        setProceed(prev => !prev)
        resetTranscript()
        if (next === sentences.length - 2) {
            setNext(0)
            navigation('/')
        }
        else {
            setNext(prev => prev + 2)
        }

    }

    if (!browserSupportsSpeechRecognition) {
        return <div>Browser does not support Speech Recognition.</div>;
    }


    return (
        <div className={classes.container}>
            {/* <div className={classes.instrutions}>
                <h1>
                    : "איך אומרים באנגלית את המילה "{[next + 1].content}
                </h1>

            </div> */}

            <div className={classes.instructions}>
                <h1>מה התרגום של המילה {' '}<span>{sentences[next + 1].content}</span> באנגלית</h1>
            </div>
            {/* <div>
                <audio controls>
                    <source src={audioClue} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div> */}
            {!proceed && <div className={classes.record}>
                <img
                    alt=''
                    src={showImage ? on : off}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            </div>}
            <div className={classes.tran}>
                {transcript && <p>{transcript}</p>}
            </div>
            {proceed ? <div className={classes.proceed}><button onClick={proceedHandler} >המשך</button></div>
                : <div className={classes.reset}>
                    {transcript && <button onClick={resetTranscript}>אפס</button>}
                </div>}

        </div>
    );

}

export default SpeechRecognize