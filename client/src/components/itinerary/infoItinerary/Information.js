import React from 'react'

const Information = (props) => {
    const { duration, price } = props

    let priceArray = new Array(5)
        .fill(0, 0)
        .fill(1, 0, price)
        .map((e, i) => <span key={i} className="material-icons iconsItinerary" style={{ color: e === 1 ? 'gold' : '#ccc' }}>paid</span>)

    let durationArray = new Array(duration)
        .fill('e', 0)
        .map((e, i) => <span key={i} className="material-icons iconsItinerary" style={{ color: '#99e' }}>watch_later</span>)

    return (
        <div className="information">
            <span className="inconsTitle">Price</span>
            <span>{priceArray}</span>
            <span className="inconsTitle">Time</span>
            <span>{durationArray}</span>
        </div>
    )
}

export default Information
