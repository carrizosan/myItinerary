import React from 'react'
import { Activity } from './infoItinerary/Activity'
import { NavItinerary } from './NavItinerary'

export const ActivitiesItinerary = (props) => {
    const { setSection, section } = props

    //This is an example of the activities property, which must be inside of each itinerary
    const activities = [
        {name: 'Coffee Gallery', img: 'https://images.pexels.com/photos/2067560/pexels-photo-2067560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Moontain', img: 'https://i.pinimg.com/564x/1d/33/80/1d33804aacb8d085ba9b98bce0c0a6a0.jpg'},
        {name: 'Bike Tour', img: 'https://images.pexels.com/photos/1122410/pexels-photo-1122410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Amazing Trekking', img: 'https://images.pexels.com/photos/4148679/pexels-photo-4148679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
    ]

    return (
        <>
            <div className="containerTitleActivities">
                <span className="titleActivities">Activities</span>
            </div>
            <div className="activitiesMainContainer">
                <NavItinerary setSection={setSection} section={section} />
                
                    {
                        activities.map(activity => {
                            return <Activity key={activity} activity={activity} />
                        })
                    }
            </div>
        </> 
    )
}
