import React, { useState } from 'react'
import classes from './LearnSentence.module.scss';


const Game = props => {
  const { sentence, word, translation, Hword } = props.game
  console.log(props.game)
  console.log(sentence)
  console.log(word)
  console.log(translation)
  console.log(Hword)
  const [clicked, setClicked] = useState(false);
  const [getNext, setGetNext] = useState(false);
  return (
    <div className={classes.game}>
      <div className={classes.sentence}>
        {sentence.split(" ").map((w) => {

          if (w === Hword || w === translation) {
            return <span className={clicked ? classes.word : ''}>{w + " "}</span>
          }
          return <span className={classes.other}>{" " + w}</span>
        })}
      </div>
      <div className={classes.btns}>
        {!getNext && <span className={classes.btn} onClick={() => {
          setClicked(true);
          setGetNext(true);
        }}>גלה את המילה</span>}
        {getNext &&
          <div className={classes.rev}>
            {word}
            <br />
            <span className={classes.btn} onClick={() => {
              props.clickHandler();
              setClicked(false);
              setGetNext(false);
            }}>הבא</span>
          </div>
        }

      </div>
    </div>
  )
}

export default Game