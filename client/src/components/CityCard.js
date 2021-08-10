import React from 'react'

export const CityCard = (props) => {
    const { name, country, img } = props

    return (
        <div className="cityCard" >
            <div className="cityImg" style={{ backgroundImage: `url('${img}')` }}>
                <div className="cityTitle">
                    <span className="cityName">{name}</span>
                    <span className="cityCountry">{country}</span>
                </div>
            </div>
            <div className="infoContainer">
                <div className="cityButton">
                    <span className="buttonText">Itineraries</span>
                    <span className="fas fa-chevron-right buttonText" ></span>
                </div>
            </div>
        </div>
    )
}
