import React, { useState } from 'react'
import classes from './Admin.module.scss'
import Container from '../container/Container'
import addSentence from '../../functions/AddSentnce'
import ALLSentences from '../../Data/sentences'

const Admin = () => {
  const [sentence, setSentnce] = useState({
    sentence: "",
    word: "",
    tranlation: "",
    Hword: "",
    level: 0,
  })
  const [visable, setVisable] = useState({ state: false, option: '' })
  const AddAll = async ()=>{
    ALLSentences.forEach(async (obj)=>{
      await addSentence(obj)
    })

  }

  return (

    <Container className={classes.contentHeader} color={"#29215A"}>
      <div className={classes.Admin}>
        <div className={classes.head}>?מה תרצה לעשות</div>
        <div className={classes.btns}>
          <span onClick={() => { AddAll(); setVisable({ state: true, option: 'Add' }) }}>Add Sentence</span>
          <span onClick={() => { setVisable({ state: true, option: 'Approve' }) }}>Approve Teachers</span>
          <span onClick={() => { setVisable({ state: true, option: 'Action' }) }}>User Actions</span>
        </div>
        {visable.state && <>

          {visable.option === 'Add' && <div>
            <div className={classes.head}>Add Sentence</div>
            <div className={classes.inputs}>
              <input type="text" placeholder="Sentence" onChange={(e) => { setSentnce({ ...sentence, sentence: e.target.value }) }} />
              <input type="text" placeholder="Word" onChange={(e) => { setSentnce({ ...sentence, word: e.target.value }) }} />
              <input type="text" placeholder="Translation" onChange={(e) => { setSentnce({ ...sentence, tranlation: e.target.value }) }} />
              <input type="text" placeholder="Hword" onChange={(e) => { setSentnce({ ...sentence, Hword: e.target.value }) }} />
              <input type="number" placeholder="Level" onChange={(e) => { setSentnce({ ...sentence, level: e.target.value }) }} />
            </div>
            <div className={classes.btns}>
              <span onClick={() => { setVisable({ state: false, option: '' }) }}>Cancel</span>
              <span onClick={() => { addSentence(sentence) }}>Add</span>
            </div>
          </div>}
          {visable.option === 'Approve' && <div>
            
          </div>}
          {visable.option === 'Action' && <div>
          </div>}
        </>}


      </div>
    </Container>

  )
}

export default Admin