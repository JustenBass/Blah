import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import UpdateCommentForm from './UpdateCommentForm'

export default function BlogComments({comment, currentBlog}) {
const { users} = useContext(UserContext)
const [updateFlag, setUpdateFlag] = useState(true)
const currentUser = users.find((user) => user.id === comment.user_id)
console.log("Curp Userp", currentUser)

  return (
    <>
    { updateFlag ?
     <div className='userComment'>
     <div className='t'>
       <img className="userAvatar" src={currentUser.avatar} alt="avatar" width="50" height="50"/>
       <b>{currentUser.username}</b> -
       {comment.comment}
       <button onClick={() => setUpdateFlag(false)}>update</button>
     </div>
   </div>
   :
   <UpdateCommentForm comment={comment} currentBlog={currentBlog} currentUser={currentUser}/>
   }
    </>
  )
}
