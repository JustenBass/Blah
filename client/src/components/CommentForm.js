import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function CommentForm({currentBlog}) {
    const { blogs, setBlogs } = useContext(UserContext)
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
      })
  }


  return (
    <form onSubmit={addComment}>
        <input
        type="text"
        id="comment"
        onChange={(e) => setComment(e.target.value)}
        />

        <input type="submit"/>
    </form>
  )
}
