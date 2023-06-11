import axios from "axios";
import { path } from './path'
import { authActions } from "../store/authSlicer";
import getSentences from './getSentences'
const turnsCalc = turns => {
    const maxPoints = 50;
    const minimumTurns = 5;
    const maximumTurns = 20;
    turns = Math.max(turns, minimumTurns);
    let points;
    if (turns >= maximumTurns) {
      points = 5;
    } else {
      const pointsRange = maxPoints - 5;
      const turnsRange = maximumTurns - minimumTurns;
      const pointsPerTurn = pointsRange / turnsRange;
      points = maxPoints - (turns - minimumTurns) * pointsPerTurn;
    }
  
    return Math.max(5, Math.round(points));
  };
const timeCalc = (time) =>{
    const maxPoints = 50;
    const minimumTime = 5;
    const maximumTime = 90;
    time = Math.max(time, minimumTime);
    let points = maxPoints - Math.floor((time - minimumTime) / (maximumTime - minimumTime) * maxPoints);
    points = Math.max(5, points);
    
    return points;
  }
const hangedCalc = num =>{
    if (num===0) return 50;
    return 50-(num*10)
}
const whackCalc = score =>{
    const maxPoints = 50;
    const minPoints = 5;
  
    // Ensure the score is within the valid range
    score = Math.max(Math.min(score, 100), 0);
  
    // Calculate the points based on the score
    const pointsRange = maxPoints - minPoints;
    const scoreRange = 100;
    const pointsPerScore = pointsRange / scoreRange;
    const points = minPoints + Math.round(score * pointsPerScore);
  
    return points;


}


const updateScore = async (id,obj,dispatch,token) => {
    let points = 0;  
    switch (obj.game) {
        case 'Card':
            points = turnsCalc(obj.type)
            break;
        case 'Jumble':
            points = timeCalc(obj.type)
            break;

        case 'Hanged':
            points = hangedCalc(obj.type)
            break;

        case 'Whack':
            points = whackCalc(obj.type)
            break;

        case 'Search':
            points = 30
            break;
        default:
            break;
    }
    console.log(points)
    try {
        const { data ,status  } = await axios.put(`${path}/account/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                points:points
            },); 
            dispatch(authActions.login({token:token,user:data}));
            const fetchSentnce = await getSentences(data.user)
            dispatch(authActions.setSentences(fetchSentnce))
            return status     
    
    }
    catch (err) {
        console.log("User Didnt Updated!")
    }







}

export default updateScore