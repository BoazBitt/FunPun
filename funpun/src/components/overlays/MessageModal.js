// import React, { useEffect, useState } from 'react'
import Closer from './SharedComponents/Closer'
import classes from './overlay.module.scss'
import { useSelector } from 'react-redux'
import ModalContent from './ModalContent'

const MessageModal = () => {
  const args = useSelector(state => state.modal.modalArgs)
  const type = useSelector(state => state.modal.modalType)

  return (
    <div className={classes.content}>

      <ModalContent className={type}>
        <div className={classes.header}>{args.Header}</div>
        <div className={classes.msgcontent}>{args.content}</div>
          <Closer />
      </ModalContent>




    </div>
  )
}

export default MessageModal