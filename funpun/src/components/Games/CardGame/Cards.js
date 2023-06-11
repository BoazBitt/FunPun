import { Fragment, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import clasess from "./Board.module.scss";
import Card from "./Card";
import classes from './Board.module.scss'

const Cards = (props) => {
  const [turns, setTurns] = useState(0);
  const [items, setItems] = useState(props.sentences.sort(() => Math.random() - 0.5))
  const [start, setStart] = useState(true);
  const [prev, setPrev] = useState(-1);


  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setTurns((prev) => prev + 1);
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setTurns((prev) => prev + 1);
        setItems([...items]);
        setPrev(-1);
      }, 600);
    }
  }

  function handleClick(id) {
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }
  useEffect(() => {
    let c = 0;
    for (let i = 0; i < 10; i++) {
      if (items[i].stat === "correct") c++;
    }
    if (c === 10) { setItems(props.sentences); setStart(false); setTurns(0); props.handleGameOver(turns); }
  }, [items, props, turns, start]);

  return (
    <Fragment>
      {/* {!start && <span className={clasess.btn} onClick={startHandler}>Lets Play</span>} */}
      {start &&
        <div className="outcontainer">
          <h1 className={classes.title}>Memory Game</h1>

          <center className="turns"> ניסיונות : {turns}</center>
          <br /><br /><br />
          <div className="container">
            {items.map((item, index) => (
              <Card
                key={index}
                item={item}
                id={index}
                handleClick={handleClick} />))}
          </div>


        </div>}
    </Fragment>
  );
};

export default Cards;
