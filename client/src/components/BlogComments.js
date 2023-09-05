import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import UpdateCommentForm from './UpdateCommentForm'

export default function BlogComments({comment, currentBlog}) {
const { user, deleteBlogComment } = useContext(UserContext)
const [updateFlag, setUpdateFlag] = useState(true)
console.log(user.blogs)


  return (
    <>
    { updateFlag ?
      <div>
        <img className="userAvatar" src={ comment.user_avatar } alt="avatar" width="50" height="50"/>
        <b>{ comment.username }</b> - {comment.comment}

       {user.id === comment.user_id ?
        <div>
          <button className="userButtonCommentTools" onClick={() => setUpdateFlag(false)}>edit</button>
          <button className="userButtonCommentTools" onClick={() => deleteBlogComment(comment, currentBlog)}>remove</button>
        </div>
        : null }
      </div>
      :
      <UpdateCommentForm comment={comment} currentBlog={currentBlog} setUpdateFlag={setUpdateFlag}/>
    }
    </>
  )
}
