import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/user'
import { useParams } from "react-router-dom";
import BlogComments from '../components/BlogComments';

export default function CurrentBlog() {
    const {id} = useParams()
    const { blogs } = useContext(UserContext)
    const [currentBlog, setCurrentBlog] = useState({
        comments: []
    })
    console.log("current blog", currentBlog)

    useEffect(() => {
        const selectedBlog = blogs.find(blog => blog.id == id)
        if(selectedBlog){
            setCurrentBlog(selectedBlog)
        }
    }, [blogs])


    const currentBlogComments = currentBlog.comments.map((comments) => (
        <BlogComments
        key={comments.id}
        comment={comments}
        />
    ))


    return (
    <div>
        <img className="blogImgPage" src={currentBlog.image} alt="blogImg" width="450" height="400"/>
        <h1>{currentBlog.title}</h1>
        <article>{currentBlog.description}</article>
        <br/>

        <h4>Comments:</h4>
        <hr/>
        {currentBlogComments}
      </div>
  )
}
