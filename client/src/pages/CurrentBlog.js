import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/user'
import { useParams } from "react-router-dom";
import BlogComments from '../components/BlogComments';
import CommentForm from '../components/CommentForm';

export default function CurrentBlog() {
    const {id} = useParams()
    const { blogs } = useContext(UserContext)
    const [currentBlog, setCurrentBlog] = useState({
        comments: []
    })


    useEffect(() => {
        const selectedBlog = blogs.find(blog => blog.id == id)
        if(selectedBlog){
            setCurrentBlog(selectedBlog)
        }
    }, [blogs])


    const currentBlogComments = currentBlog.comments.map((comment) => (
        <BlogComments
        key={comment.id}
        comment={comment}
        />
    ))


    return (
    <div className='currentBlogDiv'>
        <br/>
        <img className="blogImgPage" src={currentBlog.image} alt="blogImg" width="900" height="850"/>
        <h1 className='appGossipFont'>{currentBlog.title}</h1>
        <article>{currentBlog.blog}</article>
        <br/>

        <center>
        <hr/>
        <h4>Comments:</h4>
        </center>
        {currentBlogComments}

        <center>
            <CommentForm/>
        </center>
      </div>
  )
}
