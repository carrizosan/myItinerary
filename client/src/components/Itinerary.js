import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { InfoItinerary } from './itinerary/InfoItinerary'
import { ActivitiesItinerary } from './itinerary/ActivitiesItinerary'
import CommentsItinerary from './itinerary/CommentsItinerary'
import { itineraryActions } from '../redux/actions/itineraryActions'

const Itinerary = (props) => {
    const [section, setSection] = useState('info')
    const { likes, _id, userLogged, checkUser, comments } = props

    const [likeItinerary, setLikeItinerary] = useState({ likesCount: likes, liked: false, isLiking: false })
    const [commentsState, setCommentsState] = useState(comments)
    const [userComments, setUserComments] = useState([])

    useEffect(() => { checkLikeUser() }, [])

    const checkLikeUser = async () => {
        if (userLogged) {
            const response = await checkUser(_id, userLogged)
            setUserComments(response.arrayOwnerCheck)
            setLikeItinerary({ ...likeItinerary, liked: response.likedChek })
        }
    }

    return (
        <div className="itineraryCard">
            {
                section === 'info'
                && <InfoItinerary
                    {...props}
                    section={section}
                    setSection={setSection}
                    likeItinerary={likeItinerary}
                    setLikeItinerary={setLikeItinerary}
                />
            }
            {
                section === 'activities'
                && <ActivitiesItinerary
                    {...props}
                    section={section}
                    setSection={setSection}
                />
            }
            {
                section === 'comments'
                && <CommentsItinerary
                    {...props}
                    section={section}
                    setSection={setSection}
                    userComments={userComments}
                    setUserComments={setUserComments}
                    commentsState={commentsState}
                    setCommentsState={setCommentsState}
                />
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    checkUser: itineraryActions.checkUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)