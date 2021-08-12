import React, { useState } from 'react'

import LogIn from '../components/auth/LogIn'
import SignUp from '../components/auth/SignUp';

const Auth = () => {
    const [logIn, setLogIn] = useState(true)

    const handleStateLogRegister = () => {
        setLogIn(!logIn)
    }

    return (
        <div className="authContainer">
            {
                logIn
                ? <LogIn handleStateLogRegister={handleStateLogRegister} />
                : <SignUp handleStateLogRegister={handleStateLogRegister} /> 
            }
        </div>
    )
}
export default Auth;