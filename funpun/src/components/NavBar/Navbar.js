import classes from './Navbar.module.scss'
import Container from '../container/Container';
import logo from '../../components/assets/images/logo3.png'
import Modal from '../modal/Modal';
import { useDispatch , useSelector} from "react-redux";
import { authActions } from "../../store/authSlicer";
import { modalActions } from "../../store/modalSlicer"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = props => {
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const myModal = useSelector(state => state.modal)
  const isLogin = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const points = useSelector(state=> state.auth.points)



  const [isVisible, setIsVisible] = useState(false);
  
  const listenToScroll = () => {
    let heightToShowFrom = 500;
    const winScroll = document.body.scrollTop ||
        document.documentElement.scrollTop;
    if (winScroll < heightToShowFrom) {
       isVisible &&      // to limit setting state only the first time
         setIsVisible(false);
    } else {
         setIsVisible(true);
    }
  };

  useEffect(()=>{
    window.addEventListener("scroll", listenToScroll);
    return () =>
       window.removeEventListener("scroll", listenToScroll);
  },);

  const signOutHandler = event => {
    // event.preventDefault();
    dispatch(authActions.logout());
    navigation('/');
  }

  // &&!isVisible
  return (
    <header className={classes.headerContainer}>
      <Container className={classes.contentHeader} color={"#29215A"}>
        {myModal.isModalOpen&&<Modal message={myModal.modalArgs} type={myModal.modalType}/>}
        <Link to="/" className={classes.logo} style={{ textDecoration: 'none' }}>
        <img className={classes.im} src={logo} alt="" />
        </Link>
        {/* <div className={classes.logo}>
          
        </div> */}
        {(!isLogin && isVisible)&& <div className={classes.btns}>
          <span onClick={() => { dispatch(modalActions.openModal({modalType:'SignUp',modalArgs:null}))}}>הירשם</span>
          <span onClick={() => { dispatch(modalActions.openModal({modalType:'Login',modalArgs:null}))}}>התחבר</span>
        </div>}
        {isLogin&&user.points&&<div>נקודות:  {points}</div>}
        {isLogin && <div className={classes.btns}>
          
          <span onClick={signOutHandler}>התנתק</span>
          <div >שלום {user.first_name} </div>
          
        </div>}


      </Container>
    </header>
  );
}
export default Navbar;