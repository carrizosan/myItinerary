import React from 'react'

export const Activity = ({activity}) => {
    return (
        <div>
            <div className="activityContainer" style={{
                backgroundImage: `url(${activity.img})`
            }}>
                <span className="textActivity">{activity.name}</span>
            </div>
        </div>
    )
}
