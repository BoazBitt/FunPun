export  const allquestions = [
    {
        
        id : 'q1',
        number: '1',
        question: 'מהי האות השביעית ב-ABC?',
        type: 'open',
        answers: {},
        correctAnswer: 'g',
        notes: [],
        restrictions: {max:1}

    },
    {
        id : 'q2',
        number: '2',
        question: 'רשום את המילים הבאות בסדר ה-ABC ',
        type: 'open',
        answer: {},
        correctAnswer: 'chair,computer,desk,pencil',
        notes:['desk,computer, pencil,chair',"(הפרד בין כל מילה בעזרת פסיק)"],
        restrictions: {max:26}
    },
    {
        id : 'q3',
        number: '3',
        question: 'איך אומרים כלב באנגלית?',
        type: 'open',
        answer: {},
        correctAnswer: 'dog',
        notes: [],
        restrictions: {max:10} 
    },
    {
        id : 'q4',
        number: '4',
        question: 'השלם את המשפט הבא באנגלית',
        type: 'radio',
        answer: null,
        correctAnswer: 'walk',
        notes: ["I _____ to school every day."],
        restrictions: {}
    },

    {
        id : 'q5',
        number: '5',
        question: 'השלם את המשפט בעזרת Have/Has :',
        type: 'open',
        answer: [],
        correctAnswer: 'have',
        notes: ["I  _____ 2 pencils in my pencil case."],
        restrictions: {max:4}
    },
    {
        id : 'q6',
        number: '6',
        question: '',
        type: 'select',
        answer: {"pencil":"כלי כתיבה",'desk':'רהיט הניתן לעבוד עליו','book':'דפים כתובים או מודפסים המחוברים יחדיו'},
        correctAnswer: '',
        notes: [],
        restrictions: {max:10}
    },
    {
        id : 'q7',
        number: '7',
        question: ' מה התרגום של המילה water בעברית?',
        type: 'open',
        answer: {},
        correctAnswer: 'מים',
        notes: [],
        restrictions: {}
    },
    {
        id : 'q8',
        number: '8',
        question: 'Which of the following words means: "to make a mistake"',
        type: 'radio',
        answer: null,
        correctAnswer: 'Wrong',
        notes: [],
        restrictions: {}
    },
    {
        id : 'q9',
        number: '9',
        question: 'השלם את המשפט בעזרת Am/Is/Are: ',
        type: 'open',
        answer: {},
        correctAnswer: 'are',
        notes: ["I am happy, and my friends ____ happy too."],
        restrictions: {max:3}
    },
    {
        id : 'q10',
        number: '10',
        question: ''            ,
        type: 'select',
        answer: {"apple":'פרי עגול הקיים בצבעים אדום,צהוב או ירוק','chair':'רהיט המיועד בעיקר לישיבה הבנוי ממשטח וארבע רגליים','computer':'מכשיר חשמלי המסוגל לשמור ולעבד מידע'},
        correctAnswer: '',
        notes: [],
        restrictions: {}
    },
    {
        id : 'q11',
        number: '11',
        question: 'תכתוב פסקה קצרה באנגלית על המקום האהוב עליך',
        type: 'text',
        answer: {},
        correctAnswer: '',
        notes: [],
        restrictions: {}
        
    }
]

export default allquestions