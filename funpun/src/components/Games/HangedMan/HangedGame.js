import React, { useEffect, useState } from 'react'
import classes from './HangedGame.module.scss'
import Figure from './Figure'
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
=======
import Confetti from 'react-confetti'
import updateScore from '../../../functions/updateScore';
import { useDispatch, useSelector } from "react-redux";
>>>>>>> Stashed changes


const HangedGame = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.Token)
    const { englishwords, hebrewwords } = props
    const [next, setNext] = useState(0);
    const [gussedRight, setGussedRight] = useState(0);
    const [chars, setChars] = useState(englishwords[next].split(''))
    const [wrongLetters, setWrongLetters] = useState([])
    const [correctLetters, setCorrectLetters] = useState([])
    const [letter, setLetter] = useState('')
    const [msg, setMsg] = useState('')

    


    const isCharCorrect = char =>  correctLetters.includes(char);

    const checkLetter = () => {
        if (letter === '') return
        if (chars.includes(letter)) {
            if (correctLetters.includes(letter)) {
                setMsg('ניחשת את האות הזו.');
                return;
            }
            setCorrectLetters([...correctLetters, letter]);

        } else {
            if (wrongLetters.includes(letter)) {
                setMsg('ניחשת את האות הזו.'); 
                return;
            }
            setWrongLetters([...wrongLetters, letter]);
        }
        setLetter('')
    }
<<<<<<< Updated upstream
    const procced = () => {
        if (next === englishwords.length-1 ) {
            setNext(0)
            //update user's score!
            navigation("/");
            
=======
    const procced = async () => {
        if (next === englishwords.length - 1) {
            setNext(0)
            //update user's score!
            const response = await updateScore(user.user,{game:'Hanged',type:wrongLetters},dispatch,token)
            if (response===200) navigate('/')
>>>>>>> Stashed changes
            return
            
        }
        setNext(prev => prev + 1)
        setCorrectLetters([])
        setWrongLetters([])
        
        
    }
    useEffect(() => {
        if (checkDone()) {
            setGussedRight(prev=>prev+1);
            
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctLetters])
    useEffect(() => {
        if (wrongLetters.length === 16) {
            procced();
            setGussedRight(prev=>prev+1);
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrongLetters])
    
    useEffect(() => {
        setChars(englishwords[next].split(''))
        
        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [next])
    

    const checkDone = () => {
        const set1 = new Set(chars);
        const set2 = new Set(correctLetters);
        const flag = set1.size === set2.size && [...set1].every(value => set2.has(value))
        if (flag) 
        
        
        return flag;
    }
    
    useEffect(()=>{
        if(checkDone()){
            procced();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gussedRight])
    
    const onChangeHandler = (e) => {
        const value = e.target.value;
        const alphabetRegex = /^$|^[a-zA-Z]$/;
        if (!alphabetRegex.test(value)) {
            setMsg('הכנס אות באנגלית בלבד')
            return;
        }
        setMsg('')
        setLetter(value.toLowerCase())

    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            checkLetter(e);
        }
    }




    return (
        <div className={classes.game}>

            <div className={classes.instructions}>
                <h1>מה התרגום של המילה {' '}<span>{hebrewwords[next]}</span> באנגלית</h1>
            </div>
            <div className={classes.board}>
                <div className={classes.man}>
                    <Figure wrongLetters={wrongLetters} />
                </div>
                <div className={classes.word}>
                    <div className={classes.guessBox}>
                        <h2 >נחש אות</h2>
                        <input name='letter' maxLength={1} value={letter} onChange={onChangeHandler} onKeyDown={keyDownHandler} /><br />
                        <button onClick={checkLetter} >נחש</button>
                        <div className={classes.msg}>{msg}</div>
                    </div>

                    <div className={classes.chars}>
                        <div className={classes.char}>
                            {chars.map((char, index) => {
                                return <div key={index}>{isCharCorrect(char) ? char : '$'}</div>
                            })}
                        </div>
 

                    </div>
                    <div className={classes.wornged}>
                        <div className={classes.head}>אותיות לא נכונות</div>
                        <div className={classes.wrongLetters}>             {wrongLetters.map((char, index) => {
                            return <div className={classes.letter} key={index}>{char}{index !== wrongLetters.length - 1 ? ',' : ''}</div>
                        })}</div>

                    </div>

                </div>
            </div>



        </div>
    )
}

export default HangedGame