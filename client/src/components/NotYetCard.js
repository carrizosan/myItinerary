import React from 'react'

const NotYetCard = (props) => {

    console.log(props)
    return (
        <div className="notYetCard">
            <span>{props.children}</span>
        </div>
    )
}

export default NotYetCard
