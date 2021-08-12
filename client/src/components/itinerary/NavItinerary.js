import React from 'react'

export const NavItinerary = ({ setSection, section }) => {

    return (
        <div className="navItinerary">
            <div
             onClick={() => setSection('info')} className={section === 'info' ? 'buttonActive' : 'button'} >
                <span className="fas fa-info"></span>
            </div>
            <div onClick={() => setSection('activities')} className={section === 'activities' ? 'buttonActive' : 'button'} >
                <span className="far fa-image" style={{fontSize: 20}}></span>
            </div>
            <div onClick={() => setSection('comments')} className={section === 'comments' ? 'buttonActive' : 'button'} >
                <span className="far fa-comment-dots" style={{fontSize: 18}}></span>
            </div>
        </div>
    )
}
