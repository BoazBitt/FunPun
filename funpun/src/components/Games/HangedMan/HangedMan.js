import React from 'react'
import classes from './HangedMan.module.scss'
import Container from '../../container/Container'
import DUMMY from "../../../Data/DUMMY_WORDS";
import { useLocation} from "react-router-dom";
import HangedGame from './HangedGame';

const HangedMan = () => {
    const { state } = useLocation();
    const initialState = state ? state.sentences : DUMMY;
    const englishwords = initialState.filter((element, index) => index % 2 === 0).map(obj => obj.content.toLocaleLowerCase());
    const hebrewwords = initialState.filter((element, index) => index % 2 !== 0).map(obj => obj.content.toLocaleLowerCase());
    
    console.log('englishwords',englishwords)
    console.log('hebrewwords',hebrewwords)
    return (
        <Container color={"#29215A"}>
            <div className={classes.hanged}>
                <div className={classes.title}>Hanged-Man</div>
                <HangedGame englishwords={englishwords} hebrewwords={hebrewwords}/>
            </div>
        </Container>
    )
}

export default HangedMan