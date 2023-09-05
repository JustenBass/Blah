import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user'
import { useParams } from "react-router-dom";
import BlogComments from '../components/BlogComments';
import CommentForm from '../components/CommentForm';

export default function CurrentBlog() {
    const {id} = useParams()
    const { blogs } = useContext(UserContext)
    const [commentFormFlag, setCommentFormFlag] = useState(true)

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
        <center>
       <Link to={`/`}>
        <div className='currentBlogImage'>
          <img src={selectedBlog.image} alt="blogImg" width="900" height="850"/>
          <div className='currentBlogFadedbox'>
            <div className='title text'>
              CLICK TO VIEW ALL BLOGS
            </div>
          </div>
        </div>
      </Link>
      </center>


      <h1 className='appGossipFont'>{selectedBlog.title}</h1>
        <article>{selectedBlog.blog}</article>
        <br/>
        <hr/>

        <center>

          {commentFormFlag ?
          <div className='addCommentParent'>

            <div className='addCommentChild1'>
            <h4>{commentCount}</h4>
            </div>

            <div>
            <button className='addCommentChild2' onClick={() => { setCommentFormFlag((toggle) => !toggle) }}><h2>💬</h2></button>
            </div>

          </div>
          :
          <div className='addCommentParent2'>


          <CommentForm currentBlog={selectedBlog} setCommentFormFlag={setCommentFormFlag}/>


            <div>
            <button className='addCommentChild3' onClick={() => setCommentFormFlag(true)}><h2>X</h2></button>
            </div>
          </div>
         }
          </center>

        <center>
        <div className='commentScroll'>
        {selectedBlogComments}
        </div>
        </center>
        <br/>

      </div>
  )
}
