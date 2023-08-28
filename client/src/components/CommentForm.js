import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'

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


        const mapThroughBlogs = blogs.map((b) => {
          if(b.id === newComment.blog_id){
            const updateCurrentBlog = {
              ...b,
              comments: [...b.comments, newComment]
            }
            return updateCurrentBlog
          } else {
            return b
          }
        })

        setBlogs(mapThroughBlogs)
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
