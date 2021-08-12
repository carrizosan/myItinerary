import React from 'react'
import { Link } from 'react-router-dom';

export const CityCard = (props) => {
    const { name, country, img, _id } = props
    
    return (
        <div className="cityCard" >
            <div className="cityImg" style={{ backgroundImage: `url('${img}')` }}>
                <div className="cityTitle">
                    <span className="cityName">{name}</span>
                    <span className="cityCountry">{country}</span>
                </div>
            </div>
            <div className="infoContainer">
                <Link to={`/city/${_id}`} style={{width: '100%', height: '100%' }}>
                    <div className="cityButton">
                        <span className="buttonText">Itineraries</span>
                        <span className="fas fa-chevron-right buttonText" ></span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
