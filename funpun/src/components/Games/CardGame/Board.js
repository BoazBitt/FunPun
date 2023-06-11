import Cards from "./Cards";
import "./Board.css";
import { useEffect, useState } from "react";
import classes from './Board.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import updateScore from "../../../functions/updateScore";
import { useDispatch, useSelector } from "react-redux";




const Board = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state=>state.auth.Token)

  const { sentences } = state;
  const [done, setDone] = useState({state:false,turns:null});
  const handleGameOver = (turns) => {
    const newObj ={state:true,turns:turns}
    setDone(newObj);
  };
  useEffect(() => {
    const update = async () =>{
      if (done.state) {
        const response = await updateScore(user.user,{game:'Card',type:done.turns},dispatch,token)
        if (response===200) navigate('/')

      }

    }
    update()
 
  }, [dispatch, done, navigate, token, user.user])
  return (

    <div className={classes.top}>

      {!done.state && (
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
