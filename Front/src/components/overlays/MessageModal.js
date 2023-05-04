// import React, { useEffect, useState } from 'react'
import Closer from './SharedComponents/Closer'
import classes from './overlay.module.scss'
import { useSelector } from 'react-redux'

const MessageModal = () => {
  const args = useSelector(state=>state.modal.modalArgs)

  return (
    <div className={classes.content}>
        <div className={classes.header}>{args.Header}</div>
        <div className={classes.contactUs}>{args.content}</div>
        <Closer/>
    </div>
  )
}

export default MessageModal