import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'

export default function BlogComments({comment}) {
const { users } = useContext(UserContext)
const [userOfComment, setUserOfComment] = useState({})

useEffect(() => {
  const selectedUser = users.find((user) => user.id === comment.user_id)
  if(selectedUser){
    setUserOfComment(selectedUser)
  }
}, [users])


  return (
    <div className='userComment'>
        <br/>
        <img className="userAvatar" src={userOfComment.avatar} alt="avatar" width="50" height="50"/>
        <b>{userOfComment.username}</b> -
        {comment.comment}
    </div>
  )
}
