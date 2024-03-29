import React, { useEffect, useState } from 'react'
import classes from './HangedGame.module.scss'
import Figure from './Figure'
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
import updateScore from '../../../functions/updateScore';
import { useDispatch, useSelector } from "react-redux";


const HangedGame = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isAuthenticated)
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
    const [myConffeti, setConffeti] = useState(false)
    const [numOfErros, setNumOfErros] = useState(0)



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const isCharCorrect = char => correctLetters.includes(char);

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
    const procced = async (isWrong) => {
        if (isWrong) {
            setNext(prev => prev + 1)
            setCorrectLetters([])
            setWrongLetters([])
            setNumOfErros(prev=>prev+1)
            return

        }
        if (next === englishwords.length - 1) {
            setNext(0)
            //update user's score!
            if (isLogin) {
                const response = await updateScore(user.user, { game: 'Hanged', type: numOfErros }, dispatch, token)
                if (response === 200) navigate('/')

            }
            else {
                navigate('/')

            }

            return

        }
        setConffeti(prev => !prev)
        setTimeout(() => {
            setNext(prev => prev + 1)
            setCorrectLetters([])
            setWrongLetters([])
            setConffeti(prev => !prev)

        }, 3000);



    }
    useEffect(() => {
        if (checkDone()) {
            setGussedRight(prev => prev + 1);

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctLetters])
    useEffect(() => {
        if (wrongLetters.length === 6) {
            procced(true);
            setGussedRight(prev => prev + 1);

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

    useEffect(() => {
        if (checkDone()) {
            procced(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gussedRight])

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
            {myConffeti && <Confetti tweenDuration={1} />}
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
                                return <div className={`${classes.line}`} style={{ border: `${isCharCorrect(char) ? 'none' : ''}` }} key={index}>{isCharCorrect(char) ? char : ''}</div>
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