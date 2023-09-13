import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';

export default function CommentForm({ currentBlog, setCommentFormFlag }) {
    const { blogs, setBlogs, user, setUser, sendCommentAlert, setSendCommentAlert } = useContext( UserContext );
    const [ comment, setComment ] = useState( '' );
    const [ errors, setErrors ] = useState( '' );


    const addComment = (e) => {
      e.preventDefault()
      fetch('/comments',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
        comment: comment,
        blog_id: currentBlog.id,
      })
    })
      .then((r) => r.json())
      .then((newComment) => {
        if( !newComment.errors ){
          const addNewBlogComments = blogs.map((blog) => {
            if( blog.id === newComment.blog_id ){
              const addNewCurrentBlogComments = {
                ...blog,
                comments: [ ...blog.comments, newComment ]
              };
              return addNewCurrentBlogComments;
            } else {
              return blog;
            };
          });

          setBlogs( addNewBlogComments );
          setComment( "" );
          setCommentFormFlag( true ) ;

          const findUserBlog = user.blogs.find((blog) => blog.id === newComment.blog_id);

          if( !findUserBlog ){
            const updateUserBlogs = [ ...user.blogs, newComment.blog ];
            const updatedUser = { ...user, blogs: updateUserBlogs };
            setUser( updatedUser );
           };

          } else {
          const errorsList = newComment.errors.map((error) => <>{ error }</>);
          setErrors( errorsList );
        };
      });
    };


  return (
    <>
  <form onSubmit={ addComment }>
    <input
    className='addCommentFormInput'
    type="text"
    id="comment"
    placeholder='Blah Blah Blah...'
    value={ comment }

    onChange={(e) => {
      if( e.target.value ){
        setComment( e.target.value );
        setSendCommentAlert( false );
      } else {
            setComment( e.target.value );
            setSendCommentAlert( true );
          };
        }}
        autoFocus/>

        { sendCommentAlert ?
          <div>
            <button className='sendCommentFormInputButton' type='submit'> SEND </button>
            <h3 className='sendCommentFormError'> {errors} </h3>
          </div>
        :
          <button className='sendCommentFormInputButtonTwo' type='submit'> SEND </button>
        }
    </form>
    </>
  );
};
