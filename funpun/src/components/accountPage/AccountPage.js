import React, { useEffect, useState } from 'react'
import classes from './AccountPage.module.scss'
import Container from '../container/Container'
import { useSelector } from "react-redux";
import UpdateUser from '../../functions/UpdateUser';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlicer";
import { modalActions } from '../../store/modalSlicer';
import { ClipLoader } from 'react-spinners'
import getOtherUsers from '../../functions/getOtherUsers';


const AccountPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const [actions, setAction] = useState(null)
    const [otherUsers, setOtherUsers] = useState(null)
    // const [otherUsers, setOtherUsers] = useState([])
    // {user:20,name:"boaz" ,city:'beer sheva',level:3 }

    const [userData, setUserData] = useState(
        {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            city: user.city,
            oldpass: '',
            password: '',
            password2: ''
        }

    )
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(true)
    const clickHandler = (type) => {
        if (!actions) setAction({ action: type })
        else if (actions.action !== type) setAction({ action: type })
        else setAction(null)
    }
    const onChangeHandler = (e) => {
        setUserData({ ...userData, [e.name]: e.value })
    }
    const saveData = async() => {
        if (userData.password !== userData.password2) return
        setLoader(true)
        const data = await UpdateUser(user.user, userData);
        dispatch(authActions.setUser(data));
        setLoader(false)
        setAction(null)
    }


    useEffect(() => {
        async function fetchData() {
            const usrs = await getOtherUsers(user);
            setOtherUsers(usrs); 
            setLoader2(prev=>!prev)
          }
          fetchData();
        
        
        


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container color={"#29215A"}>
            <div className={classes.accpage}>
                <div className={classes.title}>איזור אישי</div>
                <div className={classes.btns}>
                    <span onClick={() => { clickHandler('users') }}>משתמשים</span>
                    <span onClick={() => { clickHandler('info') }}>שינוי פרטים</span>
                </div>
                {actions && <div className={classes.actions}>


                    {actions.action === 'info' && <div dir='rtl' className={classes.changeInfo}>
                        <input name='first_name' placeholder='שם פרטי' value={userData.first_name} onChange={(e) => { onChangeHandler(e.target) }} />
                        <input name='last_name' placeholder='שם משפחה' value={userData.last_name} onChange={(e) => { onChangeHandler(e.target) }} />
                        <input name='email' placeholder='דואר אלקטרוני' value={userData.email} onChange={(e) => { onChangeHandler(e.target) }} />
                        <input name='city' placeholder='עיר' value={userData.city} onChange={(e) => { onChangeHandler(e.target) }} />
                        <input name='oldpass' placeholder='סיסמא נוכחית' value={userData.oldpass} onChange={(e) => { onChangeHandler(e.target) }} />
                        <input name='password' placeholder='סיסמא חדשה' value={userData.password} onChange={(e) => { onChangeHandler(e.target) }} />
                        <input name='password2' placeholder='אימות סיסמא' value={userData.password2} onChange={(e) => { onChangeHandler(e.target) }} />
                        <div className={classes.submit}>
                            <button onClick={saveData}>שמור</button>
                            <ClipLoader size={30} color={"#9ACD32"} loading={loader} speedMultiplier={1} />
                        </div>
                    </div>}
                    <div className={classes.user}></div>
                    {actions.action === 'users' && <div
                        className={classes.users}
                        style={otherUsers&&otherUsers.length > 5 ? { overflowY: "scroll", height: "450px" } : null}>


                        {!otherUsers
                            ?
                            <div className={classes.load}><ClipLoader size={30} color={"#9ACD32"} loading={loader2} speedMultiplier={1} /></div>
                            : otherUsers.length === 0 ? <div><h1>לא נמצאו משתמשים ברמתך בעיר מגורייך</h1></div> : otherUsers.map((user, index) => (
                                <div dir='rtl' className={classes.user} key={index}>
                                    <div className={classes.userInfo}>
                                        <div>שם: {user.first_name+' '+user.last_name}</div>
                                        <div>עיר: {user.city} </div>
                                        <div>רמה: {user.userLevel}</div>
                                    </div>
                                    <div className={classes.msg}>
                                        <button onClick={() => { dispatch(modalActions.openModal({ modalType: 'SendMessage', modalArgs: user.user })) }}>שלח הודעה</button>
                                    </div>
      
                                </div>
                            ))
                        }



                    </div>}







                </div>}
            </div>
        </Container>
    )
}

export default AccountPage