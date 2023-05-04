import React from 'react'
import classes from './Admin.module.scss'
import Container from '../container/Container'
import addSentence from '../../functions/AddSentnce'

const Admin = () => {
  return (
    
    <Container className={classes.contentHeader} color={"#29215A"}>
        <div  className={classes.Admin}> 
            <div className={classes.head}>?מה תרצה לעשות</div>
            <div className={classes.btns}>
                <span onClick={()=>{addSentence()}}>Add Sentence</span>
                <span>Approve Teachers</span>
                <span>User Actions</span>
            </div>


        </div>
    </Container>
    
  )
}

export default Admin