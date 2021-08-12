import React from 'react'
import { NavItinerary } from './NavItinerary'
import Author from './infoItinerary/Author'
import Information from './infoItinerary/Information'
import Likes from './infoItinerary/Likes'

export const InfoItinerary = (props) => {
    const { section, setSection, hashtags, title } = props

    return (
        <div className="infoItinerary">
            <NavItinerary setSection={setSection} section={section} />
            <Author {...props} />
            <div className="content">
                <span className="title">{title}</span>
                <Likes {...props} />
                <Information {...props} />
                <span>{hashtags.map((hashtag, i) => <span className="hashtag" key={i}>#{hashtag}</span>)}</span>
            </div>
        </div>
    )
}
