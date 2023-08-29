import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import { useParams } from "react-router-dom";
import BlogComments from '../components/BlogComments';
import CommentForm from '../components/CommentForm';

export default function CurrentBlog() {
    const {id} = useParams()
    const { blogs } = useContext(UserContext)

    const selectedBlog = blogs.find(blog => blog.id == id)
        if(!selectedBlog){
            return <p>Loading...</p>
        }


    const selectedBlogComments = selectedBlog.comments.map((comment) => (
        <BlogComments
        key={comment.id}
        comment={comment}
        currentBlog={selectedBlog}
        />
    ))

    const commentCount = selectedBlog.comments.length


    return (
    <div className='currentBlogDiv'>
        <br/>
        <img className="blogImgPage" src={selectedBlog.image} alt="blogImg" width="900" height="850"/>
        <h1 className='appGossipFont'>{selectedBlog.title}</h1>
        <article>{selectedBlog.blog}</article>
        <br/>

        <center>
        <hr/>
        <h4>{commentCount} Comments:</h4>
        </center>
        {selectedBlogComments}
        <center>
            <CommentForm currentBlog={selectedBlog}/>
        </center>
      </div>
  )
}
