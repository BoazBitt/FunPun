import Cards from "./Cards";
import "./Board.css";
import { useEffect, useState } from "react";
import classes from './Board.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';


const Board = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { sentences } = state;
  const [done, setDone] = useState(false);
  const handleGameOver = () => {
    setDone(true);
  };
  useEffect(() => {
    if (done) {
      //update user's score!
      navigate('/')
    }
  }, [done, navigate])
  return (

    <div className={classes.top}>

      {!done && (
        <div className="Board">
          <Cards sentences={sentences} handleGameOver={handleGameOver} />
        </div>
      )}
    </div>
    // <div className={classes.top}>

    // </div>
  );
};
export default Board;
