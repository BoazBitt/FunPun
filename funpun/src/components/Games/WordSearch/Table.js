import React, { useEffect, useState } from 'react'
import classes from './Table.module.scss'
import Confetti from 'react-confetti'
import { useNavigate } from "react-router-dom";



const Table = props => {
    const { matrix, longestLength, hebrewwords, englishwords } = props
    const navigate = useNavigate();

    const [cell, setCell] = useState([])
    const [solved, setSolved] = useState([])
    const [hebBank, sethebBank] = useState([])
    const [word, setWord] = useState('')
    const [confetti, setConfetti] = useState(false)


    const handleClick = (rowIndex, colIndex, char) => {
        setCell(prev => [...prev, { first: rowIndex, second: colIndex }]);
        setWord(prev => prev + char);
    };

    const foundinSelect = (row, col) => {
        for (let i = 0; i < cell.length; i++) {
            if (cell[i].first === row && cell[i].second === col) {
                return true
            }
        }
        return false
    }
    const foundinSolved = (row, col) => {
        for (let i = 0; i < solved.length; i++) {
            if (solved[i].first === row && solved[i].second === col) {
                return true
            }
        }
        return false
    }
    useEffect(() => {
        for (let i = 0; i < englishwords.length; i++) {
            if (englishwords[i].toLowerCase() === word.toLocaleLowerCase()) {
                setCell([])
                setWord('')
                setSolved(prev => [...prev, ...cell])
                sethebBank(prev => [...prev, hebrewwords[englishwords.indexOf(word.toLocaleLowerCase())]]);
            }
        }



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word])

    const handleReset = () => {
        setCell([])
        setWord('')
    }

    useEffect(() => {
        if (hebBank.length === hebrewwords.length) {
            setConfetti(prev => !prev)
            setTimeout(() => {
                //update user's score!
                navigate('/')

            }, 5000);
        }
    }, [hebBank, hebrewwords, navigate])


    const foundBank = (word) => hebBank.includes(word);
    return (
        <>
            <div>
                <div className={classes.bank}>
                    <div className={classes.bankHead}>
                        בנק מילים
                    </div>
                    <div className={classes.bankWords}>
                        {hebrewwords.map((word, index) => <p style={foundBank(word) ? { color: 'red' } : { color: 'white' }} key={index}>{word}</p>)}
                    </div>

                </div>
                <div className={classes.table}>
                    <div className={classes.matrix} style={{ display: 'grid', gridTemplateColumns: `repeat(${longestLength + 2}, 2fr)` }}>
                        {matrix.map((row, rowIndex) => (
                            <div key={rowIndex} className={classes.row} style={{ display: 'grid', gridTemplateRows: `repeat(${longestLength + 2}, 2fr)` }}>
                                {row.map((col, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className={classes.char}
                                        onClick={() => {
                                            if (!foundinSolved(rowIndex, colIndex)) {
                                                handleClick(rowIndex, colIndex, matrix[rowIndex][colIndex]);
                                            }
                                        }}
                                        style={foundinSelect(rowIndex, colIndex) ? {
                                            boxShadow: ''
                                            , backgroundColor: 'yellow', color: 'black'
                                        }
                                            :
                                            foundinSolved(rowIndex, colIndex) ? {
                                                boxShadow: ''
                                                , backgroundColor: 'green', color: 'black'
                                            }
                                                :
                                                { backgroundColor: '#29215A' }}
                                    >
                                        {matrix[rowIndex][colIndex]}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {word.length > 0 &&
                    <div className={classes.btn}>
                        <button onClick={handleReset}>Rest</button>
                    </div>
                }
            </div>
            {confetti && <Confetti />}
        </>
    )
}

export default Table