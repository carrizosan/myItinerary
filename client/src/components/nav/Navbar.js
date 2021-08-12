import React from 'react'
import Logo from './Logo';
import IconsNavbar from './IconsNavbar';

const Navbar = () => {
    return (
        <div className="innerHeaderContainer">
            <Logo />
                <h1 className="myTyneraryTitle">MyTinerary</h1>
            <IconsNavbar />
        </div>
    )
}
export default Navbar;