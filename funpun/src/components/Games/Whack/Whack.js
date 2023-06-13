/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import classes from "./Whack.module.scss";
import Container from "../../container/Container";
import { useLocation, useNavigate } from "react-router-dom";
import DUMMY from "../../../Data/DUMMY_WORDS";
import mole from "../../assets/images/mole.png";
import updateScore from '../../../functions/updateScore';
import { useDispatch, useSelector } from "react-redux";
import Confetti from 'react-confetti'


const Whack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.Token)
  const { state } = useLocation();
  const initialState = state ? state.sentences : DUMMY;
  const [next, setNext] = useState(0);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const [divs, setDivs] = useState([
    { id: 1, content: "" },
    { id: 2, content: "" },
    { id: 3, content: "" },
    { id: 4, content: "" },
    { id: 5, content: "" },
    { id: 6, content: "" },
    { id: 7, content: "" },
    { id: 8, content: "" },
    { id: 9, content: "" },
  ]);
  const [randomDivIndex, setRandomDivIndex] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * divs.length);
      setRandomDivIndex(randomIndex);
      const evenIndex =
        Math.floor(Math.random() * (initialState.length / 2)) * 2;
      const newDivs = [...divs];
      newDivs[randomIndex] = {
        ...newDivs[randomIndex],
        content: initialState[evenIndex].content,
      };

      setDivs(newDivs);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [divs]);

  useEffect(() => {
    if (randomDivIndex) {
      setTimeout(() => {
        setRandomDivIndex(null);
      }, 2000);
      setTimeout(() => {
        setDivs(divs.map((div) => ({ ...div, content: "" })));
      }, 2000);
    }
  }, [randomDivIndex]);

  const handleClick = async () => {
    if (divs[randomDivIndex].content === initialState[next].content) {
      setScore((prev) => prev + 20);
      if (next === initialState.length - 2) {
        setConfetti(prev => !prev)
        setRandomDivIndex(100)
        //update user's score!
        setNext(0);
        if (isLogin) {
          const response = await updateScore(user.user, { game: 'Whack', type: score }, dispatch, token)
          if (response === 200) navigate('/')
        }
        else {
          navigate('/')
        }
      } else {
        setNext((prev) => prev + 2);
      }
    } else {
      if (score < 5) {
        setScore(0);
      } else {
        setScore((prev) => prev - 5);
      }
    }
  };

  return (
    <Container color={"#29215A"}>


      {start && (
        <div className={classes.whack}>
          <h1 id={classes.title}>Whack The Mole</h1>
          {!confetti ?
            <>
              <div className={classes.data}>
                <div className={classes.score}>התוצאה שלך: {score}</div>
                <div className={classes.instructions}>
                  <h1>מה התרגום של המילה {' '}<span>{initialState[next + 1].content}</span> באנגלית</h1>
                </div>
              </div>

              <div className={classes.board}>
                <div className={classes.holes}>
                  {divs.map((div, index) => (
                    <div
                      className={classes.hole}
                      key={div.id}
                      onClick={index === randomDivIndex ? handleClick : null}
                    >
                      {index === randomDivIndex && (
                        <div className={classes.mole}>
                          <span>{div.content}</span>
                          <img src={mole} alt="mole" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div></> : <Confetti />}

        </div>
      )}
      {!start && (
        <div className={classes.start}>
          <div className={classes.btn}>
            <h3>"המשחק הוא "הכה את החפרפרת </h3>
            <h3>
              כדי לתרגל את המילים שלמדנו בכל פעם תתבקשו לפגוע בחפרפרת עם התרגום{" "}
            </h3>
            <h3> פגיעה נכונה תזכה ב20 נקודות</h3>
            <h3>פגיעה לא נכונה וירדו 5 נקודות מהציון </h3>
            <h3>בהצלחה</h3>
            <span
              onClick={() => {
                setStart(true);
              }}
            >
              התחל משחק
            </span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Whack;
