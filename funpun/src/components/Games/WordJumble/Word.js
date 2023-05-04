import React, { useEffect, useState } from 'react';
import classes from './Word.module.scss';

const Word = (props) => {


  const { w1, w2 } = props;
  const chars = w1.split('');


  const [value, setValue] = useState('');
  const [startTime, setStartTime] = useState(Date.now()); // set start time when component mounts
  const [endTime, setEndTime] = useState(0);
  const [res, setRes] = useState({ proceed: false, type: 'def' });
  const [color,setColor] = useState('white');


  const handleChange = (event) => {
    if (!res.proceed) {
      const newValue = event.target.value;
      setValue(newValue);
    }
  };
  useEffect(()=>{
    if (value.length===w1.length && res.type==='Correct'){
      setColor('green')
    }
    else if (value.length===w1.length && res.type==='Wrong'){
      setColor('red')
    }
    else{
      setColor('white')
    }
  },[res.type,value,w1])

  const click = () => {
    setValue('');
    setEndTime(Date.now());
    setRes({ proceed: true, type: 'Correct' });
    props.setTime(elapsedTime)
    setStartTime(Date.now())
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
      <div className={classes.instruct}>
        {' '}
        :רשום באנגלית את המילה {w2}
      </div>
      <div className={classes.jword}>{clue} :רמז</div>
      <div className={classes.word}>
        {chars.map((char, index) => (
          <div key={index} className={classes.mybox}>
            {value[index] ? value[index] : ''}
          </div>
        ))}
      </div>
      <div className={classes.in}>
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
        {res.proceed && <button onClick={click}>Proceed</button>}
      </div>

      <div className={classes.time}>
        {res.proceed && `Time taken: ${elapsedTime.toFixed(2)} seconds`}
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
