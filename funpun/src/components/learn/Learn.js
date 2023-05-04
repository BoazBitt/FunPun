import {  useState } from 'react';
import classes from './Learn.module.scss'
import LearnSentence from './LearnSentence'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changeSentence } from '../../functions/changeSentce';
import DUMMY_SENTENCES from '../../Data/DUMMY_SENTENCES'
// import S1 from '../../Data/sentences'
// import board3 from '../assets/images/board3.png'
import board4 from '../assets/images/board4.png'
// import back from '../assets/images/back.jpg'


const allgames = ['Jumble']
const NUMOFGAMES = allgames.length

//'CardGame','Jumble','Whack'

const Learn = () => {
  const navigation = useNavigate();

  const isLogin = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const sentences = useSelector(state => state.auth.sentences)

  const userLevel = isLogin?user.userLevel:1;
  const LearnedSentences = isLogin?sentences:DUMMY_SENTENCES;
  // const LearnedSentences = isLogin?S1:DUMMY_SENTENCES;
  
  const [start, setStart] = useState(false)
  const [next, setNext] = useState(0);
  const [done, setDone] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [game, setGame] = useState(allgames[Math.floor(Math.random() * NUMOFGAMES)])

  const clickHandler = () => {
    if(next === LearnedSentences.length-1){
      setDone(true);
      setNext(0);

    }
    else{
      setNext(prev=>prev+1)
    }

    
  }

  const onStartHandler = () => {
    setStart(true);
  }
  const refHandler = (String) => {
    const newSentnces = changeSentence(LearnedSentences)
    console.log(sentences)
    console.log(newSentnces)
    if (String === 'Game') {
      navigation(`/${game}`, { state: { sentences: newSentnces, prev: LearnedSentences } })
    }
    else {
      navigation(`/VerbalTest`, { state: { sentences: newSentnces } })
    }
  }

  return (
    <div className={classes.container}>
      {!start &&
        <div className={classes.start}>
          <div className={classes.info}>
            <img src={board4} alt="Background" />
            <div className={classes.info_text}>
              <h1> שלב {userLevel}</h1>
              <button onClick={onStartHandler}>התחל</button>
            </div>
          </div>

        </div>}
      {start && <div className={classes.top}>
        {!done &&
          <div className={classes.started}>
            <div className={classes.started_text}>
              <LearnSentence clickHandler={clickHandler} game={LearnedSentences[next]} />
            </div>
          </div>}
        {done && <div className={classes.doneLearning}>
          <h1> סיימנו את יחידת הלימוד</h1>
          <div className={classes.btnsContnet}>
            <span onClick={() => { refHandler('Verbal') }}>בחן את עצמך בבוחן בע"פ (בוחן בע"פ יקנה לך יותר ניקוד)</span>
            <span onClick={() => { refHandler('Game') }}>בחן את עצמך בעזרת משחק</span>
          </div>
        </div>}
      </div>}

    </div>

  );

}
export default Learn;