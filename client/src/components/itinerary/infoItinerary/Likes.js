import React from 'react'
import { connect } from 'react-redux'
import { itineraryActions } from '../../../redux/actions/itineraryActions'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure()

const Likes = (props) => {
    const { _id, sendLikeBack, userLogged, likeItinerary, setLikeItinerary } = props
    const { likesCount, liked, isLiking } = likeItinerary

    const sendLike = async () => {
        if (!isLiking && userLogged) {
            setLikeItinerary({ ...likeItinerary, liked: true, isLiking: true })
            const response = await sendLikeBack(_id, userLogged)
            setLikeItinerary({ likesCount: response.likes, liked: response.liked, isLiking: false })
        } else if (!userLogged) {
            toast.info('You need to be logged for like this itinerary!', {position: toast.POSITION.TOP_RIGHT})
        }
    }

    return (
        <div className="likesContainer">
            <div className="likesNumberContainer" onClick={sendLike}>
                <span className="likeNumber" style={{ color: liked ? 'white' : 'blue' }}>{likesCount || ''}</span>
            </div>
            {
                liked
                    ? <span className="fas fa-heart heartItinerary" onClick={sendLike}></span>
                    : <span className="far fa-heart heartItinerary" onClick={sendLike}></span>
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
    sendLikeBack: itineraryActions.sendLikeBack
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes)
