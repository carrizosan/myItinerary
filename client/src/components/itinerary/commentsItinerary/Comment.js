import React, { useState } from 'react'
import DeleteComment from './DeleteComment'
import EditComment from './EditComment'

const Comment = (props) => {
    const { text, userName, userPic, _id, userComments } = props

    const [canDelete, setCanDelete] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    const userIsOwner = userComments.some(commentId => commentId === _id)

    return (
        <div className="comment">
            <DeleteComment
                {...props}
                canDelete={canDelete}
                setCanDelete={setCanDelete}
            />
            <div className="userPic" style={{ backgroundImage: `url('${userPic}')` }}></div>
            <div className="commentContent">
                <span className="userName">{userName}</span>
                {
                    (!canDelete && userIsOwner)
                    && <div className="commentsButtons">
                        <span className="fas fa-edit button" onClick={() => setCanEdit(!canEdit)}></span>
                        <span className="fas fa-trash-alt button" onClick={() => setCanDelete(true)}></span>
                    </div>
                }
                <div className="userText">
                    <EditComment
                        {...props}
                        canEdit={canEdit}
                        setCanEdit={setCanEdit}
                    />
                    {!canEdit && <span>{text}</span>}
                </div>
            </div>
        </div>
    )
}

export default Comment

