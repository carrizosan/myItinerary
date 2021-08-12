import React from 'react'
import { connect } from 'react-redux'
import commentActions from '../../../redux/actions/commentActions'

const DeleteComment = (props) => {
    const { deleteComment, _id, setCommentsState, canDelete, setCanDelete, userLogged } = props

    const sendDeleteComment = async () => {
        setCanDelete(false)
        const commentsFiltered = await deleteComment(userLogged.token, _id)
        setCommentsState(commentsFiltered)
    }

    return (
        <div className="deleteCommentModal" style={{ display: canDelete ? 'flex' : 'none' }}        >
            <div className="textContainer">
                <span>Are you sure you want to delete this comment?</span>
                <span>This cannot be undone.</span>
            </div>
            <div className="buttonsContainer">
                <div className="button" onClick={() => setCanDelete(false)}>
                    <span>Cancel</span>
                </div>
                <div className="button" onClick={sendDeleteComment}>
                    <span>Delete</span>
                </div>
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
    deleteComment: commentActions.deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteComment)

