import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function UpdateCommentForm({comment, currentUser, currentBlog}) {
    const { users, setUsers } = useContext(UserContext)
    const [userUpdatedComment, setUserUpdatedComment] = useState('')



    function updateUserComment(){
        fetch(`/comments/${comment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                comment: userUpdatedComment,
                blog_id: currentBlog.id
            })
        })
        .then((r) => r.json())
        .then((updatedComment) => {

            const updateUserComment = users.map((user) => {
                if(user.id === updatedComment.user_id){
                    const updateCurrentUserComment = {
                        ...user,
                        comments: [user.comments, updatedComment]
                    }
                    return updateCurrentUserComment
                } else {
                    return user
                }
            })
            setUsers(updateUserComment)
        })
    }

  return (
        <div>
                <img className="userAvatar" src={currentUser.avatar} alt="avatar" width="50" height="50"/>
                <b>{currentUser.username}</b> -
                <form onSubmit={updateUserComment}>
                <input
                type="text"
                name="comment"
                placeholder={comment.comment}
                onChange={(e) => setUserUpdatedComment(e.target.value)}
                value={userUpdatedComment}
                />

                <input type="submit"/>
            </form>
        </div>
  )
}
