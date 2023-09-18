import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';

export default function CommentForm({ currentBlog }) {
    const { addComment, sendCommentPinkAlert, setSendCommentPinkAlert, commentErrors} = useContext( UserContext );
    const [ hideCommentError, setHideCommentError ] = useState( null )
    const [ commentData, setCommentData ] = useState({
      comment: ''
    });


    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      if( value ) {
        setCommentData({
          ...commentData,
          [name]: value
        });
        setSendCommentPinkAlert( false );
      } else if( !value ) {
        setCommentData({
          ...commentData,
          [name]: value
        });
        setSendCommentPinkAlert( true );
      }
    };


    const handleSubmit = (e) => {
      e.preventDefault()
      const update = {
        ...commentData,
        blog_id: currentBlog.id
      }
      addComment( update )
      setCommentData( { comment: '' } )
      setSendCommentPinkAlert( true )
    }

  return (
    <div>
  <form onSubmit={ handleSubmit }>
    <input
      className='addCommentFormInput'
      type="text"
      name="comment"
      placeholder='Blah Blah Blah...'
      value={ commentData.comment }
      onChange={ handleChange }
    autoFocus/>

        { sendCommentPinkAlert ?
          <div>
            <button className='sendCommentFormInputButton' type='submit' onClick={ () => setHideCommentError( true )}> SEND </button>
            <h3 className='sendCommentFormError'> { hideCommentError ? commentErrors : null } </h3>
          </div>
        :
          <button className='sendCommentFormInputButtonTwo' type='submit'> SEND </button>
        }
        </form>
    </div>
  );
};

