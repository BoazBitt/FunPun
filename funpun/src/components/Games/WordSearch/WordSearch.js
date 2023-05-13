import React from 'react'
import classes from './WordSearch.module.scss'
import Container from '../../container/Container'
import DUMMY from "../../../Data/DUMMY_WORDS";
import { useLocation, /*useNavigate*/ } from "react-router-dom";
import placeWordsInMatrix from '../../../functions/createMatrix'
import Table from './Table';



const WordSearch = () => {    
    const { state } = useLocation();
    const initialState = state ? state.sentences : DUMMY;
    const allwords = initialState.filter((element, index) => index % 2 === 0);
    const translation = initialState.filter((element, index) => index % 2 !== 0);
    const longestLength = allwords.reduce((maxLength, currentString) => {
        return currentString.content.length > maxLength ? currentString.content.length : maxLength;
    }, 0);
    const matrix = placeWordsInMatrix(longestLength + 2, allwords);
    const englishwords = allwords.map(obj => obj.content.toLocaleLowerCase());
    const hebrewwords = translation.map(obj => obj.content.toLocaleLowerCase());






    return (
        <Container color={"#29215A"}>
            <div className={classes.WordsSearch}>
                <h1 id={classes.title}>Word Search</h1>
                <Table matrix={matrix} 
                       longestLength={longestLength} 
                       hebrewwords={hebrewwords} 
                       englishwords={englishwords} />
            </div>

        </Container>
    )
}

export default WordSearch