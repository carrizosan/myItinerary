import React, { useState } from 'react'
import { connect } from 'react-redux'
import commentActions from '../../../redux/actions/commentActions'

const EditComment = (props) => {
    const { text, canEdit, setCanEdit, editComment, userLogged, _id, setCommentsState } = props

    const [editedComment, setEditedComment] = useState({ text: text })

    const getInput = (e) => { setEditedComment({ ...editedComment, text: e.target.value }) }

    const sendEditComment = async () => {
        const commentsModified = await editComment(userLogged.token, _id, editedComment)
        setCommentsState(commentsModified)
        setCanEdit(false)
    }

    return (
        <div
            className="editCommentModal"
            style={{ display: canEdit ? 'flex' : 'none' }}
        >
            <textarea className="editText" onChange={getInput}>{text}</textarea>
            <div className="editButton" onClick={sendEditComment}>
                <span>Edit</span>
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
    editComment: commentActions.editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
