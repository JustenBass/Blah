import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function UpdateCommentForm({ comment, currentBlog, setUpdateFlag }) {
    const { blogs, setBlogs, deleteBlogComment } = useContext(UserContext)
    const [userUpdatedComment, setUserUpdatedComment] = useState(comment.comment)
    const [errors, setErrors] = useState('')
    const [showErrorsFlag, setShowErrosFlag] = useState(true)

    const errorSwitchCountdown = () => {
        let countdown = 5
        while(countdown > 1){
            console.log('countdown', --countdown)
        }
        setShowErrosFlag(true)
    }

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
            if(!updatedComment.errors){
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
            } else {
                const errorsList = updatedComment.errors.map((error) => <>{error}</>)
                setErrors(errorsList)
            }
        })
    }

  return (
        <div>
                <img className="userAvatar" src={comment.user_avatar} alt="avatar" width="50" height="50"/>
                <b>{comment.username}</b> -
                <form onSubmit={updateUserComment}>
                <input
                className='commentFormInput'
                type="text"
                onChange={(e) => setUserUpdatedComment(e.target.value)}
                value={userUpdatedComment}
                autoFocus/>

                <button className='updateCommentFormInputButton' type="submit"> SEND </button>
            </form>
            <button className="userButtonCommentTools" onClick={() => deleteBlogComment(comment, currentBlog)}> remove </button>
            <ul>
                <h3>{errors}</h3>
            </ul>
        </div>
  )
}
