import React, { useEffect, useState } from 'react'
import Comment from './commentsItinerary/Comment'
import NewComment from './commentsItinerary/NewComment'
import { NavItinerary } from './NavItinerary'

const CommentsItinerary = (props) => {
    const { setSection, section, _id, userComments, commentsState, setCommentsState,setUserComments } = props

    return (
        <div className="commentsSection">
            <NavItinerary setSection={setSection} section={section} />
            <div className="title">
                <span>Comments</span>
            </div>
            <div className="commentsContainer">
                {
                    commentsState.map(comment => {
                        return <Comment
                            key={comment._id}
                            {...comment}
                            itineraryId={_id}
                            userComments={userComments}
                            setCommentsState={setCommentsState}
                        />
                    })
                }
            </div>
            <NewComment
                itineraryId={_id}
                setCommentsState={setCommentsState}
                setUserComments={setUserComments}
            />
        </div>
    )
}

export default CommentsItinerary
