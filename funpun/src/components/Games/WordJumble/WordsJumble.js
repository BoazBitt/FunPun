import React, { useState } from 'react'
import Container from '../../container/Container'
import classes from './WordsJumble.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Word from './Word'

import DUMMY from '../../../Data/DUMMY_WORDS'

const WordJumle = props => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialState = state ? state.sentences : DUMMY;



  // eslint-disable-next-line no-unused-vars
  const [words, setWords] = useState(initialState);
  const [next, setNext] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const setTime = time => {
    console.log('in setTime', time);
    setTotalTime((prev) => prev + time)
  }
  console.log("totaltime: ", totalTime)



  const clickHandler = () => {
    if (next === words.length-2) {
      setNext(0);
      //update user's score!
      navigate('/')
    }
    else {
      setNext((prev) => prev + 2);
    }

  }
  console.log(initialState)


  return (
    <Container color={"#29215A"}>
      <div className={classes.contain}>
        <Word w1={words[next].content} w2={words[next + 1].content} clickHandler={clickHandler} setTime={setTime} />
      </div>
    </Container>

  )
}

export default WordJumle
