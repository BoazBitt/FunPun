import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import on from '../assets/images/on-removebg-preview.png'
import off from '../assets/images/off-removebg-preview.png'
import classes from './SpeechRecognize.module.scss'
import { useDispatch, useSelector } from "react-redux";
import updateScore from '../../functions/updateScore';

const SpeechRecognize = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sentences } = props
    const [next, setNext] = useState(8);
    const [proceed, setProceed] = useState(false)
    const [listening, setListening] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const isLogin = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.Token)

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
            SpeechRecognition.startListening({ continuous: true ,language: 'en-US'});
        } else {
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

    const proceedHandler = async () => {
        setProceed(prev => !prev)
        resetTranscript()
        if (next === sentences.length - 2) {
            setNext(0)
            if (isLogin) {
                const response = await updateScore(user.user, { game: 'Speech', type: 100 }, dispatch, token)
                if (response === 200) navigate('/')
            }
            else {
                navigate('/')
            }
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