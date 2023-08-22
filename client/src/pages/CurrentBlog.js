import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/user'
import { useParams } from "react-router-dom";

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

  return (
    <div>
        <img src={currentBlog.image} alt="blogImg" width="200" height="200"/>
            {currentBlog.title}
            {currentBlog.description}
      </div>
  )
}
