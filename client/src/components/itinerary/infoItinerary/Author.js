import React from 'react'

const Author = (props) => {
    const {  authorName, authorPic, img,  } = props

    return (
        <div className="imgContainer" >
            <div className="imgFilter" >
                <div className="authorPic" style={{ backgroundImage: `url('${authorPic}')` }}></div>
                <span className="authorName">{authorName}</span>
            </div>
            <div className="img" style={{ backgroundImage: `url('${img}')` }}></div>
        </div>
    )
}

export default Author
