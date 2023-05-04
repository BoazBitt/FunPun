import React from 'react'
import classes from './../overlay.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Social = props => {
    const socialClick = () => {
        alert('not implemented yet')
    }
    return (
        <div className={classes.social} onClick={socialClick}>
            <div>
                <FontAwesomeIcon size="2x" icon={faGoogle} /> Google
            </div>
            <div>
                <FontAwesomeIcon size="2x" className='fb' icon={faFacebook} /> Facebook
            </div>

        </div>
    )
}

export default Social