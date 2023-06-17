import React from 'react'
import classes from './../overlay.module.scss'
import { modalActions } from "../../../store/modalSlicer"
import { useDispatch,useSelector} from "react-redux";


const Switches = () => {

  const type = useSelector(state => state.modal.modalType)
  
  const dispatch = useDispatch();
  const click = type=>{
    dispatch(modalActions.openModal({modalType:type,modalArgs:null}))}

  return (
    <div className={classes.Switch}>
      {type === 'Login' ? (
        <>
          {/* <button disabled>התחברות</button> */}
          <button onClick={()=>{click('SignUp')}}>הרשמה</button>
        </>
      ) : (
        <>
          <button onClick={()=>{click('Login')}}>התחברות</button>
          {/* <button disabled >הרשמה</button> */}
        </>
      )}
    </div>
  )
}

export default Switches