import Container from "../container/Container";
import classes from "./Footer.module.scss";
import Modal from "../modal/Modal";
import { modalActions } from "../../store/modalSlicer"
import { useDispatch , useSelector} from "react-redux";


const Footer = props => {
    const dispatch = useDispatch();
    const myModal = useSelector(state => state.modal)
    // 
    // 
    return (
        <footer className={classes.footerContainer}>
            <Container className={classes.contentFooter} color={"#29215A"}>
            {myModal.isModalOpen && <Modal type = {myModal.modalType}/>}
                <div className={classes.btns}>
                    <span /*onClick={() => { dispatch(modalActions.openModal({modalType:'About',modalArgs:null})) }}*/>About Us</span>
                    <span onClick={() => { dispatch(modalActions.openModal({modalType:'Contact',modalArgs:null})) }}>Contact</span>
                </div>
            </Container>
        </footer>

    );


}
export default Footer;