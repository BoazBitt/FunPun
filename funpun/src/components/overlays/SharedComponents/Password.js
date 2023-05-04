import React, { useState } from 'react';
import classes from './Password.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Password = (props) => {
    const { password, place ,input } = props;

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className={classes.password}>
            <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className={classes.eyeIcon}
            />
            <input
                maxLength={20}
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder={place}
                className={classes.inputField}
                onChange={(event) => { props.onInputChange(event,input) }}
            />
        </div>
    );
};

export default Password;
