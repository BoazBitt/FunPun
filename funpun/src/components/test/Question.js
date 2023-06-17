import classes from './Test.module.scss'

const Question = props => {


    const item = props.item
    const { id, number, question, answer, type, notes, restrictions } = item
    const maxchars = (("max" in restrictions) ? restrictions.max : 50)
    let options = [];
    if (type === 'select' && typeof answer === 'object') {
        options = Object.entries(answer).map(([key, value]) => (
            <option key={key} value={key}>
                {value}
            </option>
        ));
    }


    return (
        <div className={classes.question}>
            <p >  {number})  &nbsp;{question}</p>
            {notes.map((note => <p key={Math.random()}>{note}<br /></p>))}
            {type === 'open' &&<div className={classes.inputContainer}>
                <input
                    required
                    size={maxchars}
                    maxLength={maxchars}
                    type="text"
                    value={props.answers[id]}
                    onChange={e => props.handleAnswerChange(id, e.target.value)} /></div>
            }
            {type === 'radio' && <div className={classes.inputContainer}>{answer.map((option, index) => (
                <div key={index}><input type="radio"
                    id={option}
                    value={option}
                    name="check"
                    onChange={e => props.handleAnswerChange(id, e.target.value)} />
                    <label htmlFor={option}>{option}</label><br /><br /></div>))}</div>}
            {type === 'select' && <div className={classes.inputContainer}>
                <select value={props.answers[id]} onChange={e => props.handleAnswerChange(id, e.target.value)}>
                    <option value="">בחר...</option>
                    {options}
                </select>
            </div>
            }
            {type === 'text' && <div className={classes.inputContainer}>
                <textarea value={props.answers[id]} onChange={e => props.handleAnswerChange(id, e.target.value)}></textarea>
            </div>}
            <div style={{ fontWeight: 'bold', color: 'red' }} ><br />{props.errs[id]}<br /></div>

        </div>

    )
}


export default Question