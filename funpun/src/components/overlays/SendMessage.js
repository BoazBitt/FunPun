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
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(true)
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState(null)
    // const [allMessages, setAllMessages] = useState(DUMMY_CHAT)


    useEffect(() => {
        const fetch = async () => {
            const data = await getAllMessages(sender, receiver);
            setAllMessages(data);
            setLoader2(prev => !prev)
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendMessage = async () => {
        if (!message.length) return;
        setLoader(prev => !prev)
        // eslint-disable-next-line no-unused-vars
        const post = await postAMessage({ sender: sender, receiver: receiver, content: message });
        setLoader(prev => !prev)
        setMessage('')
        const updatesMsgs = await getAllMessages(sender, receiver);
        setAllMessages(updatesMsgs);
        setMessage('')
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
                        <div className={classes.icon}
                            onClick={sendMessage}
                        >
                            <IoIosSend size={30} color="yellowgreen" className="custom-icon" />

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


