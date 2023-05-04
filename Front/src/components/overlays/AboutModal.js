import React from 'react'
import classes from './overlay.module.scss'
import Closer from './SharedComponents/Closer'
import Exit from './SharedComponents/Exit'

const AboutModal = () => {
  return (
    <div dir="rtl" className={classes.content}>
      <Exit/>
      <div className={classes.header}>קצת עלינו</div>
      <div className={classes.incontent}>
        <div className={classes.About}>
          <div></div>
          <div>
            <h3>Personalized education.</h3>

          </div>
          <div></div>
          <h6>
            Everyone learns in different ways. For the first time in history, we can analyze how millions of people learn at once to create the most effective educational system possible and tailor it to each student.
            Our ultimate goal is to give everyone access to a private tutor experience through technology.
          </h6>
          <h3>Making learning fun.</h3>
          <h6>
            It's hard to stay motivated when learning online, so we made Duolingo so fun that people would prefer picking up new skills over playing a game.
          </h6>
        </div>
        

      </div>
      <div className={classes.btns}>
        <Closer />
      </div>
    </div>
  )
}

export default AboutModal