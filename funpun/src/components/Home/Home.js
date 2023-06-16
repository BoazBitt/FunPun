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
  const user = useSelector(state => state.auth.user)
  const userFullName = user ? user.first_name + " " + user.last_name : null
  const userLevel = user ? user.userLevel : null
  const superuser = user ? user.is_superuser : false
  const school = user ? user.school_name : null;




   
  return (
    <>
      <Container className={classes.homeContainer} color={"#FF0000"}>
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
              {isLogin && userLevel && <h1> רמתך הנוכחית היא {userLevel}</h1>}
              {isLogin && userLevel && <>
                <Link to={'/Learn'} className={classes.continue} style={{ textDecoration: 'none' }}>המשך ללמוד</Link>
                <Link to={'/Account'} className={classes.continue} style={{ textDecoration: 'none' }}>איזור אישי</Link>

                </>}

              {isLogin && school && <Link to={'/Teacher'} className={classes.continue} style={{ textDecoration: 'none' }}>דף מורה</Link>}
            </>}

        </Animated>
      </Container>
      <Content />
    </>
  );





}

export default Home;
