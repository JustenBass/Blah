import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function CommentForm({currentBlog, setCommentFormFlag}) {
    const { blogs, setBlogs } = useContext(UserContext)
    const [sendCommentAlert, setSendCommentAlert] = useState(true)
    const [comment, setComment] = useState('')


    const addComment = (e) => {
      e.preventDefault()
      fetch('/comments',{
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            comment: comment,
            blog_id: currentBlog.id
        })
      })
      .then((r) => r.json())
      .then((newComment) => {

        const addNewBlogComments = blogs.map((blog) => {
          if(blog.id === newComment.blog_id){
            const addNewCurrentBlogComments = {
              ...blog,
              comments: [...blog.comments, newComment]
            }
            return addNewCurrentBlogComments
          } else {
            return blog
          }
        })

        setBlogs(addNewBlogComments)
        setComment("")
        setCommentFormFlag(true)
      })
  }


  return (
    <form onSubmit={addComment}>

         <input
        className='commentFormInput'
        type="text"
        id="comment"
        placeholder='Blah Blah Blah...'
        value={comment}
        onChange={(e) => {
          if(e.target.value){
            setComment(e.target.value)
            setSendCommentAlert(false)
          } else {
            setComment(e.target.value)
            setSendCommentAlert(true)
          }
        }}
        />

        {sendCommentAlert ?
        <button className='commentFormInputButton' type='submit'>SEND</button>
        :
        <button className='commentFormInputButtonTwo' type='submit'>SEND</button>
        }
    </form>
  )
}
