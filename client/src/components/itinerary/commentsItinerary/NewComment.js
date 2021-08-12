import React, { useState } from 'react'
import { connect } from 'react-redux'
import commentActions from '../../../redux/actions/commentActions'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure()

const NewComment = (props) => {
    const { itineraryId, setCommentsState, newComment, userLogged, setUserComments } = props
    const [textComment, setTextComment] = useState({ text: '' })

    const getInput = (e) => {
        setTextComment({ ...textComment, text: e.target.value })
    }

    const sendNewComment = async () => {
        if (textComment.text.length === 0) {
            toast.info('Please complete the field to send a comment', { position: toast.POSITION.TOP_RIGHT })
        } else if (userLogged) {
            const newComments = await newComment(userLogged.token, itineraryId, textComment)
            setCommentsState(newComments.response)
            setTextComment({ text: '' })
            setUserComments(newComments.arrayOwnerCheck)
        } else {
            toast.error('You need to be logged for comment this itinerary!', { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div className="newCommentContainer">
            <textarea
                className="textField"
                placeholder="Write your comment here..."
                value={textComment.text}
                onChange={getInput}
            ></textarea>
            <div
                className="newCommentButton"
                onClick={sendNewComment}
            >
                <span>Send</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    newComment: commentActions.newComment
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
