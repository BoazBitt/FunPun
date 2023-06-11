import React, { useState } from 'react'
import Container from '../../container/Container'
import classes from './WordsJumble.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Word from './Word'
import DUMMY from '../../../Data/DUMMY_WORDS'
import updateScore from '../../../functions/updateScore'
import { useDispatch, useSelector } from "react-redux";


const WordJumle = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.Token)
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialState = state ? state.sentences : DUMMY;



  // eslint-disable-next-line no-unused-vars
  const [words, setWords] = useState(initialState);
  const [next, setNext] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [done, setDone] = useState(0);

  const setTime = time => {
    console.log('in setTime', time);
    setTotalTime((prev) => prev + time)
  }



  const clickHandler = async () => {
    if (next === words.length - 2) {
      const update = async () => {
        //update user's score!
        const response = await updateScore(user.user, { game: 'Jumble', type: totalTime }, dispatch, token)
        if (response === 200) navigate('/')
      }
      update()

    }
    else {
      setNext((prev) => prev + 2);
    }

  }


  return (
    <Container color={"#29215A"}>
      {!done && <div className={classes.contain}>
        <Word w1={words[next].content} w2={words[next + 1].content} clickHandler={clickHandler} setTime={setTime} next={next} setDone={setDone} />
      </div>}
      {done && <div className={classes.contain}>
        <div className={classes.done}>
          <h1>הסתיים המשחק</h1>
          <h2>זמן כולל: {totalTime.toFixed(2)} שניות</h2>
        </div>

      </div>}

    </Container>

  )
}

export default WordJumle
