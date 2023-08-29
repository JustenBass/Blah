import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function UpdateCommentForm({ comment, currentUser, currentBlog, setUpdateFlag }) {
    const { blogs, setBlogs } = useContext(UserContext)
    const [userUpdatedComment, setUserUpdatedComment] = useState(comment.comment)



    function updateUserComment(e){
        e.preventDefault()
        fetch(`/comments/${comment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                comment: userUpdatedComment,

            })
        })
        .then((r) => r.json())
        .then((updatedComment) => {

            const updateSelectedCurrentBlogComment = currentBlog.comments.map((comment) => {
                if(comment.id === updatedComment.id){
                    return updatedComment
                } else {
                    return comment
                }
            })

            const updateCurrentBlogCommentsShowPage = blogs.map((blog) => {
                if(blog.id === updatedComment.blog_id){
                    return {
                        ...currentBlog,
                        comments: updateSelectedCurrentBlogComment
                    }
                } else {
                    return blog
                }
            })
            setBlogs(updateCurrentBlogCommentsShowPage)
            setUpdateFlag(true)
        })
    }

  return (
        <div>
                <img className="userAvatar" src={currentUser.avatar} alt="avatar" width="50" height="50"/>
                <b>{currentUser.username}</b> -
                <form onSubmit={updateUserComment}>
                <input
                type="text"
                onChange={(e) => setUserUpdatedComment(e.target.value)}
                value={userUpdatedComment}
                />

                <input type="submit"/>
            </form>
        </div>
  )
}
