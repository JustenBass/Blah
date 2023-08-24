import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'

export default function CommentForm() {
    const {id} = useParams()
    const { addComment, blogs, user} = useContext(UserContext)
    const [currentBlog, setCurrentBlog] = useState({})
    const [comment, setComment] = useState('')


    useEffect(() => {
      const selectedBlog = blogs.find(blog => blog.id == id)
      if(selectedBlog){
          setCurrentBlog(selectedBlog)
      }
  }, [blogs])


    const handleSubmit = (e) => {
        e.preventDefault()
        addComment({
            comment: comment,
            user_id: user.id,
            blog_id: currentBlog.id
        })
    }

    

  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        id="comment"
        onChange={(e) => setComment(e.target.value)}
        />

        <input type="submit"/>
    </form>
  )
}
