import React, { useEffect, useState } from 'react';
import classes from './Word.module.scss';
import Confetti from 'react-confetti'


const Word = (props) => {


  const { w1, w2 } = props;
  const chars = w1.split('');
  const [value, setValue] = useState('');
  const [startTime, setStartTime] = useState(Date.now()); // set start time when component mounts
  const [endTime, setEndTime] = useState(0);
  const [res, setRes] = useState({ proceed: false, type: 'def' });
  const [color,setColor] = useState('white');
  const [guess, setGuess] = useState(0);

  const handleChange = (event) => {
    if (!res.proceed) {
      const newValue = event.target.value;
      setValue(newValue);
    }
  };


  useEffect(()=>{
    if (value.length===w1.length && res.type==='Correct'){
      setColor('green')
      setGuess(0);
    }
    else if (value.length===w1.length && res.type==='Wrong'){
      setGuess((prev)=> prev + 1);
      setColor('red')
    }
    else{
      setColor('white')
    }
  },[res.type,value,w1])

  const click = () => {
    setValue('');
    setGuess(0);
    setEndTime(Date.now());
    setRes({ proceed: true, type: 'Correct' });
    props.setTime(elapsedTime)
    setStartTime(Date.now())
    if (props.next===8)props.setDone(prev=>!prev)
    props.clickHandler();

  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (value.toLocaleLowerCase() === w1.toLocaleLowerCase()) {
      setEndTime(Date.now());
      setRes({ proceed: true, type: 'Correct' });
    } else {
      setRes({ proceed: false, type: 'Wrong' });
    }
  }, [value, w1]);



  const elapsedTime = res.proceed ? (endTime - startTime) / 1000 : 0;
  const jumbleWord = word => {
    let jumbledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    while (jumbledWord === word) {
      jumbledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    }
    return jumbledWord;

  }
  const [clue, setClue] = useState('')
  useEffect(() => { const jumbledWord = jumbleWord(w1); setClue(jumbledWord) }, [w1])
  return (
    <div className={classes.container}>
      <h1 id={classes.title}>Word Jumble</h1>
      <div className={classes.__content}>
        <div className={classes.instruct}>
          <h1>רשום באנגלית את המילה {' '}<span>{w2}</span>:</h1>
        </div>
        <div className={classes.word}>
          {chars.map((char, index) => (
            <div key={index} className={classes.mybox}>
              {value[index] ? value[index] : ''}
            </div>
          ))}
        </div>
        {guess > 2 && 
          <div className={classes.jword}>
            <span>רמז: {clue}</span>
          </div>
        }
        <div className={classes.in}>
          <label>הכנס את המילה</label>
          <input
            required
            maxLength={chars.length}
            type="text"
            id="myInput"
            value={value}
            onChange={handleChange}
            disabled={res.proceed}
            style={{backgroundColor:color}}
            />
        </div>
        <div className={classes.btn}>
          {res.proceed && <Confetti/>}
          {res.proceed &&  <button onClick={click}>המשך</button>}
          {res.proceed && <span>הזמן שלקח לך {elapsedTime.toFixed(2)} שניות</span>}
        </div>
     
      </div>

    </div>
  );
};

export default Word;






// import React, { useEffect, useState } from 'react'
// import classes from './Word.module.scss'

// const Word = props => {
//   const { w1, w2 } = props
//   const chars = w1.split('');


//   const [value, setValue] = useState("");
//   // eslint-disable-next-line no-unused-vars
//   const [last, setLast] = useState(0);
//   const [res, setRes] = useState({ proceed: false, type: "def" });

//   const handleChange = (event) => {
//     const newValue = event.target.value
//     setValue(newValue)
//     setLast((prev) => prev + (newValue.length - value.length))
//   }





//   useEffect(() => {
//     if (value.toLocaleLowerCase() === w1.toLocaleLowerCase()) {
//       setRes({ proceed: true, type: "Correct" })
//     }
//     else {
//       setRes({ proceed: false, type: "Wrong" })
//     }
//   }, [value, w1])


//   const click = () => {
//     setValue("");
//     setLast(0);
//     setRes({ proceed: false, type: "def" });
//     props.clickHandler()

//   }


//   return (
//     <div className={classes.container}>
//       <div className={classes.instruct}> תרשום באנגלית את המילה {w2}</div>

//       <div className={classes.word}>
//         {chars.map((char, index) => (
//           <div key={index} className={classes.mybox}>
//             {value[index] ? value[index] : ''}
//           </div>
//         ))}
//       </div>

//       <div className={classes.in}>
//         <input
//           required
//           maxLength={chars.length}
//           type="text"
//           id="myInput"
//           value={value}
//           onChange={handleChange} />
//       </div>


//       <div className={classes.btn}>
//         {res.proceed && <button onClick={click}>Proceed</button>}
//       </div>
//     </div>
//   );
// }

// export default Word
