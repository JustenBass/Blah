import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useParams } from "react-router-dom";
import BlogComments from '../components/BlogComments';
import CommentForm from '../components/CommentForm';

export default function CurrentBlog() {
    const { id } = useParams()
    const { blogs, isAuthenticated, userError } = useContext(UserContext)
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

        if(isAuthenticated){
          return (
            <div className='currentBlogDiv'>
                <br/>
                <h1 className='currentBlogHeaderFont'>{selectedBlog.title}</h1>
                <center>
                  <img src={selectedBlog.image} alt="blogImg" width="700" height="650"/>
                </center>

                <article>{ selectedBlog.blog }</article>
                <br/>
                <hr/>

                <center>
                  {commentFormFlag ?
                    <div className='addCommentParentDiv'>

                      <div className='addCommentChild'>
                        <h4>{commentCount}</h4>
                      </div>
                      <button className='addCommentButton' onClick={() => { setCommentFormFlag((toggle) => !toggle) }}><h2>💬</h2></button>
                    </div>
                  :
                    <div className='addCommentFormParentDiv'>

                      <div className='addCommentFormChild'>
                        <CommentForm currentBlog={ selectedBlog } setCommentFormFlag={ setCommentFormFlag }/>
                      </div>

                      <button className='addCommentCancelButton' onClick={() => setCommentFormFlag(true)}><h2>X</h2></button>
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
        } else {
          return (
            <div className='userErrorDiv'>
              <h3 className='userErrorFont'>{ userError }</h3>
            </div>
         )
        }

}
