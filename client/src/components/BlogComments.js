import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import UpdateCommentForm from './UpdateCommentForm'

export default function BlogComments({comment}) {
const { users } = useContext(UserContext)
const [updateFlag, setUpdateFlag] = useState(true)
  const selectedUser = users.find((user) => user.id === comment.user_id)


  return (
    <>
    { updateFlag ?
     <div className='userComment'>
     <div className='t'>
       <img className="userAvatar" src={selectedUser.avatar} alt="avatar" width="50" height="50"/>
       <b>{selectedUser.username}</b> -
       {comment.comment}
       <button onClick={() => setUpdateFlag(false)}>update</button>
     </div>
   </div>
   :
   <UpdateCommentForm/>
   }
    </>
  )
}
