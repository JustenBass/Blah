import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import UpdateCommentForm from './UpdateCommentForm'

export default function BlogComments({comment, currentBlog}) {
const { blogs, setBlogs, user } = useContext(UserContext)
const [updateFlag, setUpdateFlag] = useState(true)

const deleteBlogComment = (selectedComment) => {
  fetch(`/comments/${selectedComment.id}`,{
      method: 'DELETE',
      headers: { 'Content-Type' : 'application/json'}
  })
  .then(() =>{
    const deleteCurrentBlogComment = currentBlog.comments.filter((comment) => comment.id !== selectedComment.id)

    const returnNonDeletedCurrentBlogComments = blogs.map((blog) => {
      if(blog.id === currentBlog.id){
        return {
          ...currentBlog,
          comments: deleteCurrentBlogComment
        }
      } else {
        return blog
      }
    });
    setBlogs(returnNonDeletedCurrentBlogComments)
  })
}

  return (
    <>
    { updateFlag ?
      <div>
       <img className="userAvatar" src={ comment.user_avatar } alt="avatar" width="50" height="50"/>
       <b>{ comment.username }</b> -
       {comment.comment}
       {user.id === comment.user_id ?
       <div>
       <button className="userButtonCommentTools" onClick={() => setUpdateFlag(false)}>edit</button>
       <button className="userButtonCommentTools" onClick={() => deleteBlogComment(comment)}>remove</button>
       </div>
       : null }
      </div>


   :
   <UpdateCommentForm comment={comment} currentBlog={currentBlog} setUpdateFlag={setUpdateFlag}/>
   }
    </>
  )
}
