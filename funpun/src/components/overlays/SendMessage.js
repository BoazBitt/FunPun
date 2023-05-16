import React, { useEffect, useState } from 'react'
// import classes from './overlay.module.scss'
import classes from './modules/SendMessage.module.scss'
import Closer from './SharedComponents/Closer';
import Exit from './SharedComponents/Exit';
import { ClipLoader } from 'react-spinners'
import { useSelector } from "react-redux";
import { IoIosSend } from 'react-icons/io'
import getAllMessages from '../../functions/getAllMessages'
import postAMessage from '../../functions/postAMessage'
// import DUMMY_CHAT from '../../Data/DUMMY_CAHT';


const SendMessage = () => {
    // const type = useSelector(state => state.modal.modalType)
    const sender = useSelector(state => state.auth.user.user)
    const receiver = useSelector(state => state.modal.modalArgs)
    console.log('sender', sender)
    console.log('receiver', receiver)
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(true)
    const [allMessages, setAllMessages] = useState(null)
    const [message, setMessage] = useState('')
    // const [allMessages, setAllMessages] = useState(DUMMY_CHAT)


    useEffect(() => {
        getAllMessages(sender, receiver).then((data) => { setLoader2(prev => !prev); setAllMessages(data) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendMessage = () => {
        if (!message.length) return;
        console.log(message);
        setLoader(prev => !prev)
        postAMessage({ sender: sender, receiver: receiver, content: message }).then((data) => {
            setLoader(prev => !prev)
            setMessage('')
            getAllMessages(sender, receiver).then((data) => { setAllMessages(data); setMessage('') })


                ;
        })
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    return (<>
        {!allMessages ? <ClipLoader size={30} color={"#9ACD32"} loading={loader2} speedMultiplier={1} /> :
            <div dir="rtl" className={classes.content}>
                <Exit />
                <div className={classes.header}>שיחה</div>

                <div className={classes.ChatBox}>
                    <div style={allMessages && allMessages.length > 5 ? { overflowY: "scroll", height: "100%" } : null}
                        className={classes.chat}>
                        {allMessages && allMessages.map((message, index) =>
                            message.sender === sender
                                ?
                                <div key={index} dir='rtl' className={classes.sender}>{message.content}</div>
                                :
                                <div key={index} className={classes.reciver} dir='ltr'>{message.content}</div>
                        )}

                    </div>
                    <div className={classes.reply}>
                        <input className={classes.input}
                            type="text"
                            placeholder="הקלד הודעה"
                            value={message}
                            onKeyDown={keyDownHandler}
                            onChange={(e) => { setMessage(e.target.value) }} />
                        <div className={classes.icon} onClick={sendMessage}>
                            <IoIosSend size={30} color="yellowgreen" className="custom-icon" />
                            {/* <IoIosSend size={30}
                                style={{ color: '#000000', transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => e.target.style.color = '#ff0000'}
                                onMouseLeave={(e) => e.target.style.color = '#ADD8E6'}
                            /> */}
                        </div>
                    </div>
                </div>






                <div className={classes.btns}>
                    <Closer />
                    <ClipLoader size={30} color={"#9ACD32"} loading={loader} speedMultiplier={1} />

                </div>


            </div>
        }
    </>

    )
}

export default SendMessage


