import React, { useState } from 'react'
import { connect } from 'react-redux';
import { authActions } from '../../redux/actions/authActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()
const SignUp = (props) => {
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        userPic: '',
        country: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        userPic: ''
    });

    const countries = ['United States', 'Brazil', 'United Kingdom', 'Spain', 'Argentina', 'Germany']

    const { email, firstName, lastName, password, userPic, country } = user

    const handleDataUser = ({target}) => {
        setUser({
            ...user,
            [target.name] : target.value
        })
    }

    const sendData = async () => {
        if(!Object.values(user).includes('')) {
            const response = await props.newUser(user)
            
            let fields = {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                userPic: '',
                country: ''
            }

            response ? setErrors({fields}) : setUser({fields})

            response && response.map(err => setErrors(prevState => {
                return {...prevState, [err.context.label] : err.message}
            }))

        } else {
            toast.error('All the fields are mandatory', {position: toast.POSITION.TOP_RIGHT})
        }
    }

    return (
        <div className="formAccessContainer">
            <div className="inputContainer">
                <p>First name</p>
                <input
                    className="inputForm"
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={handleDataUser}
                    name="firstName"
                />
                <div className="containerInputError">
                    <span className="msgInputError">{errors.firstName && errors.firstName}</span>
                </div>
            </div>
            <div className="inputContainer">
                <p>Last name</p>
                <input
                    className="inputForm"
                    type="text"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={handleDataUser}
                    name="lastName"
                />
                <div className="containerInputError">
                    <span className="msgInputError">{errors.lastName && errors.lastName}</span>
                </div>
            </div>
            <div className="inputContainer">
                <p>Email</p>
                <input
                    className="inputForm"
                    type="text"
                    placeholder="Your email"
                    value={email}
                    onChange={handleDataUser}
                    name="email"
                />
                <div className="containerInputError">
                    <span className="msgInputError">{errors.email && errors.email}</span>
                </div>
            </div>

            <div className="passwordCountryContainer">
                <div className="inputFormDouble">
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

                <div className="inputFormDouble">
                    <p>Country</p>
                    <select onChange={handleDataUser} name="country" id="selectCountry" value={country}>
                        <option disabled selected value=''>Choose one</option>
                        {
                            countries.map(country => {
                                return <option key={country} value={country}>{country}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="containerInputError">
                <span className="msgInputError">{errors.password && errors.password}</span>
            </div>

            <div className="inputContainer">
                <p>Url image</p>
                <input
                    className="inputForm"
                    type="text"
                    placeholder="Your url image"
                    value={userPic}
                    onChange={handleDataUser}
                    name="userPic"
                />
                <div className="containerInputError">
                    <span className="msgInputError">{errors.userPic && errors.userPic}</span>
                </div>
            </div>

            <span className="btnSubmit" onClick={sendData}>Register</span>
            <span className="btnSubmit btnAlreadyHaveAccount" onClick={props.handleStateLogRegister}>I already have an account</span> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    newUser: authActions.newUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);