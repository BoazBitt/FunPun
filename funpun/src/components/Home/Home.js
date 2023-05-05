import React from "react";
import Container from "../container/Container";
import classes from "./Home.module.scss";
import earth from '../../components/assets/images/earth.png';
import { Animated } from "react-animated-css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Content from "../content/Content";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { modalActions } from "../../store/modalSlicer"
import { useDispatch } from "react-redux";


const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isAuthenticated)
  const userFullName = useSelector(state => state.auth.user.first_name + " " + state.auth.user.last_name)
  const UserLevel = useSelector(state => state.auth.user.userLevel)
  const superuser = useSelector(state => state.auth.user.is_superuser)
  const school = useSelector(state=>state.auth.user.school_name)





  return (
    <>
      <Container className={classes.homeContainer} color={"#29215A"}>
        <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOut"
          isVisible={true}
          className={classes.imgHome}
        >
          <img src={earth} alt={""} />
        </Animated>
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOut"
          isVisible={true}
          className={classes.contentHome}
        >
          {!isLogin && <>
            <h1>הדרך החינמית, המהירה והיעילה ביותר ללמוד אנגלית</h1>
            <div className={classes.btnsContnet}>
              <span onClick={() => { dispatch(modalActions.openModal({ modalType: 'SignUp', modalArgs: null })) }}>הירשם</span>
              <span onClick={() => { dispatch(modalActions.openModal({ modalType: 'Login', modalArgs: null })) }}>התחבר</span>
              <AnchorLink className={classes.anch} href="#PageContent" style={{ textDecoration: 'none' }}>?איך זה עובד</AnchorLink>
  

              <span onClick={() => { dispatch(modalActions.openModal({ modalType: 'School', modalArgs: null })) }}>כניסת מורים</span>
            </div></>}
          {isLogin && superuser ? <>
            <h1>Hello Admin</h1>
            <Link to={'/Admin'} className={classes.continue} style={{ textDecoration: 'none' }}>Admin Page</Link>


          </> :
            <>
              {isLogin && <h1>{userFullName} שלום </h1>}
              {isLogin &&UserLevel&& <h1> רמתך הנוכחית היא {UserLevel}</h1>}
              {isLogin &&UserLevel&& <Link to={'/Learn'} className={classes.continue} style={{ textDecoration: 'none' }}>המשך ללמוד</Link>}
              {isLogin&&school&&<Link to={'/Teacher'} className={classes.continue} style={{ textDecoration: 'none' }}>דף מורה</Link>}
            </>}
          


        </Animated>
      </Container>
      <Content />
    </>
  );





}

export default Home;