import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authActions } from '../../redux/actions/authActions'

const IconsNavbar = (props) => {
    return (
        <div className="accessContainer">
            <Link to="/" className="link">Cities</Link>
            {
                props.userLogged
                    ? <div className="cursor-pointer" onClick={props.logOut}>
                        <span className="link">Log out</span>
                    </div>
                    : <Link to="/access" className="link">Access</Link>
            }
            <span id="userImage" style={{
                backgroundImage: `url(${props.userLogged ? props.userLogged.userPic : 'https://icon-library.com/images/generic-user-icon/generic-user-icon-18.jpg'})`
            }}></span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    logOut: authActions.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(IconsNavbar);