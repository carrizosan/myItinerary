import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../redux/actions/authActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure()

const LogIn = (props) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const { email, password } = user;

    const handleDataUser = ({target}) => {
        setUser({
            ...user,
            [target.name] : target.value
        })
    }
    
    const sendData = async () => {
        if(!Object.values(user).includes('')) {
            props.logIn(user)
        } else {
            toast.error('All the fields are mandatory', {position: toast.POSITION.TOP_RIGHT})
        }
    }

    return (
        <div className="formAccessContainer">
            <div>
                <p>Email</p>
                <input
                    className="inputForm"
                    type="text"
                    placeholder="Your email"
                    value={email}
                    onChange={handleDataUser}
                    name="email"
                />
            </div>
            <div>
                <p>Password</p>
                <input
                    className="inputForm"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={handleDataUser}
                    name="password"
                />
            </div>

            <span className="btnSubmit" onClick={sendData}>LogIn</span>
            <span className="btnSubmit btnAlreadyHaveAccount" onClick={props.handleStateLogRegister}>I don't have an account</span> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    logIn: authActions.logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);