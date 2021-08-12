import React from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link exact to='/'>
            <div
                className="headerLogo"
                style={{ backgroundImage: `url('https://mindhubweb.com/img/logo_blanco.d4a91367.jpg')` }}
            >
            </div>
        </Link>
    )
}
export default Logo;