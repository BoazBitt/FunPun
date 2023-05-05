import React, { useState } from 'react'
import classes from './LearnSentence.module.scss';


const Game = props => {
  const { sentence, word, translation, Hword } = props.game

  const [clicked, setClicked] = useState(false);
  const [getNext, setGetNext] = useState(false);
  return (
    <div className={classes.game}>
      <div className={classes.sentence_results}>
        <div className={classes.sentence}>
          {sentence.split(" ").map((w) => {

          if (w === Hword || w === translation) {
            return (
            <span className={clicked ? classes.word : ' '}>  {w + "  "}
            </span>
            )
          }
          return(
          <span> 
          {" " + w}
          </span>
          )
          })}
        </div>
        {getNext &&  <label className={classes.results}>{word}</label>}
      </div>

      <div className={classes.btns}>
        {!getNext && 
          <button className={classes.btn} onClick={() => {
            setClicked(true);
            setGetNext(true);
          }}>
            גלה את המילה
          </button>
        }
        {getNext &&
            <button 
              onClick={() => {
                props.clickHandler();
                setClicked(false);
                setGetNext(false);
            }}>
              הבא
            </button>
        }

      </div>
    </div>
  )
}

export default Game