import Container from "../container/Container";
import classes from "./Content.module.scss";
import { Link } from "react-router-dom";

const Content = () => {
    return (

        <Container>
            <div className={classes.top} >
                <center className={classes.divv} id= "PageContent">
                    <h1>  ברוכים הבאים </h1>
                    <h1>  FunPun  </h1>

                    <h3>האפליקציה שתעזור לכם ללמוד מילים באנגלית </h3>
                    <h4>?אז איך זה עובד</h4>
                    <h5>

                        בכל שלב יהיו לכם חמישה משפטים בעברית בכל משפט נמצאת מילה באנגלית וגם
                        התרגום שלה
                    </h5>

                    <h5>
                        לאחר מכן רק המילה והתרגום שלה יישארו ויוצגו המילה באנגלית והפירוש שלה
                    </h5>
                    <h5>(עצה מאיתנו תנסו לנחש מהי המילה לפני שאתם לוחצים הבא)</h5>
                    <h5>
                        לאחר חמישה משפטים יהיה משחק קטן שיעזור לכם לזכור אפילו עוד יותר טוב את
                        המילים
                    </h5>
                    <h5>צברו ניקוד ותוכלו להתקדם לשלבים מתקדמים יותר</h5>
                    <h2>!בהצלחה</h2>
                    <Link to="/Learn" className={classes.lnk} style={{ textDecoration: 'none' }}>נסה דמו</Link>
                </center>
            </div>


        </Container>
    )
}
export default Content;