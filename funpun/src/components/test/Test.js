/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import signUpUser from '../../functions/signUpUser'
import Container from '../container/Container'
import classes from './Test.module.scss'
import Question from './Question'
import EvalueateTest from '../../functions/EvalTest'
// import MessageModal from '../overlays/MessageModal'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal'
import allunits from '../../Data/sentences'
const totalUnits = allunits.length





const Test = () => {
    const { state } = useLocation()
    const navigation = useNavigate()
    const signupData = state ? state.signupData : null


    const arr = ['Pencil', 'Book', 'Desk']
    const arr2 = ['Apple', 'Chair', 'computer']

    const [arr3, setarr3] = useState(['bike', 'bus', 'walk', 'car'].sort(() => Math.random() - 0.5));
    const [arr4, setarr4] = useState(['Correct', 'Wrong', 'Right'].sort(() => Math.random() - 0.5));

    const [Choice1, setChoice1] = useState(arr[Math.floor(Math.random() * arr.length)]);
    const [Choice2, setChoice2] = useState(arr2[Math.floor(Math.random() * arr2.length)]);

    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: '' });
    const [errs, setErrss] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '' });




    const calculateUserLevel = (score) => {
        const totalLevels = Math.ceil(totalUnits / 5);
        const levelPercentage = score / 100;
        let userLevel = Math.floor(totalLevels * levelPercentage);
        if (userLevel===0) return 1
        userLevel = userLevel - Math.floor(userLevel * 0.25)

        return userLevel;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        let score = 0;
        const lastKey = Object.keys(answers).slice(-1)[0];


        allquestions.forEach(
            (obj) => {
                if (obj.id !== lastKey) {
                    if (answers[obj.id].toLowerCase() === obj.correctAnswer.toLowerCase()) {
                        score += 10;
                    }
                }
            }
        )

        const userLevel = calculateUserLevel(score)
        const dataToSignUp = { ...signupData, userLevel: userLevel }
        signUpUser(dataToSignUp).then((data) => {
            navigation('/')

        })

        // const GPTEval = await EvalueateTest(answers.q11)
        // const GPTscore = GPTEval.split("/")[0]
        // score += parseInt(GPTscore) * 2
        // const finalScore = Math.floor(score / 1.2)
        // const dataToSignUp = { ...signupData,userLevel:userLevel}
        // signUpUser(dataToSignUp).then((data) => {
        //     navigation('/')

        // })
    };

    const handleAnswerChange = (id, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [id]: value
        }));
    };



    const allquestions = [
        {

            id: 'q1',
            number: '1',
            question: 'מהי האות השביעית ב-ABC?',
            type: 'open',
            answer: {},
            correctAnswer: 'g',
            notes: [],
            restrictions: { max: 1 }, err: ''

        },
        {
            id: 'q2',
            number: '2',
            question: 'רשום את המילים הבאות בסדר ה-ABC ',
            type: 'open',
            answer: {},
            correctAnswer: 'chair,computer,desk,pencil',
            notes: ['desk,computer, pencil,chair', "(הפרד בין כל מילה בעזרת פסיק)"],
            restrictions: { max: 26 }, err: ''
        },
        {
            id: 'q3',
            number: '3',
            question: 'איך אומרים כלב באנגלית?',
            type: 'open',
            answer: {},
            correctAnswer: 'dog',
            notes: [],
            restrictions: { max: 10 }, err: ''
        },
        {
            id: 'q4',
            number: '4',
            question: 'השלם את המשפט הבא באנגלית',
            type: 'radio',
            answer: arr3,
            correctAnswer: 'walk',
            notes: ["I _____ to school every day."],
            restrictions: {}, err: ''
        },

        {
            id: 'q5',
            number: '5',
            question: 'השלם את המשפט בעזרת Have/Has :',
            type: 'open',
            answer: [],
            correctAnswer: 'have',
            notes: ["I  _____ 2 pencils in my pencil case."],
            restrictions: { max: 4 }, err: ''
        },
        {
            id: 'q6',
            number: '6',
            question: `התאם את המילה ${Choice1} להגדרה הנכונה`,
            type: 'select',
            answer: { "pencil": "כלי כתיבה", 'desk': 'רהיט הניתן לעבוד עליו', 'book': 'דפים כתובים או מודפסים המחוברים יחדיו' },
            correctAnswer: `${Choice1}`,
            notes: [],
            restrictions: { max: 10 }, err: ''
        },
        {
            id: 'q7',
            number: '7',
            question: ' מה התרגום של המילה water בעברית?',
            type: 'open',
            answer: {},
            correctAnswer: 'מים',
            notes: [],
            restrictions: {}, err: ''
        },
        {
            id: 'q8',
            number: '8',
            question: 'Which of the following words means: "to make a mistake"',
            type: 'radio',
            answer: arr4,
            correctAnswer: 'Wrong',
            notes: [],
            restrictions: {}, err: ''

        },
        {
            id: 'q9',
            number: '9',
            question: 'השלם את המשפט בעזרת Am/Is/Are: ',
            type: 'open',
            answer: {},
            correctAnswer: 'are',
            notes: ["I am happy, and my friends ____ happy too."],
            restrictions: { max: 3 }, err: ''
        },
        {
            id: 'q10',
            number: '10',
            question: `התאם את המילה ${Choice2} להגדרה הנכונה`,
            type: 'select',
            answer: { "apple": 'פרי עגול הקיים בצבעים אדום,צהוב או ירוק', 'chair': 'רהיט המיועד בעיקר לישיבה הבנוי ממשטח וארבע רגליים', 'computer': 'מכשיר חשמלי המסוגל לשמור ולעבד מידע' },
            correctAnswer: `${Choice2}`,
            notes: [],
            restrictions: {}, err: ''
        },
        {
            id: 'q11',
            number: '11',
            question: 'תכתוב פסקה קצרה באנגלית על המקום האהוב עליך',
            type: 'text',
            answer: {},
            correctAnswer: '',
            notes: [],
            restrictions: {}, err: ''

        }
    ]


    return (
        <Container color={"#29215A"}>
            <div dir="rtl" className={classes.contain}>
                <div className={classes.instruction}>
                    <p>על מנת להשלים את ההרשמה </p>
                    <p>אנא ענו על השאלון על מנת שנוכל לקבוע את הרמה שלכם</p>
                    <h4>אם יש שאלה שאתם לא יודעים השאירו את השדה ריק</h4>
                </div>
                <div className={classes.questions}>
                    <form color={'black'}>
                        {allquestions.map(item => (
                            <Question key={item.id} item={item} handleAnswerChange={handleAnswerChange} errs={errs} answers={answers} />))}
                        <br />
                        <div className={classes.btnsContnet}>
                            <span onClick={handleSubmit}>סיים</span></div>
                    </form>
                </div>

            </div>
        </Container>
    );

}

export default Test
