import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';

export default function UpdateCommentForm({ comment, currentBlog, setUpdateFlag }) {
    const { blogs, setBlogs, deleteBlogComment, updateCommentPinkAlert, setUpdateCommentPinkAlert } = useContext( UserContext );
    const [ userUpdatedComment, setUserUpdatedComment ] = useState( comment.comment );
    const [ errors, setErrors ] = useState( '' );

    function updateUserComment(e){
        e.preventDefault()
        fetch(`/comments/${comment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                comment: userUpdatedComment,
            })
        })
        .then((r) => r.json())
        .then((updatedComment) => {
            if( !updatedComment.errors ){
                const updateSelectedCurrentBlogComment = currentBlog.comments.map((comment) => {
                    if( comment.id === updatedComment.id ){
                        return updatedComment
                    } else {
                        return comment
                    };
                });

                const updateCurrentBlogCommentsShowPage = blogs.map((blog) => {
                    if( blog.id === updatedComment.blog_id ){
                        return {
                            ...currentBlog,
                            comments: updateSelectedCurrentBlogComment
                        };
                    } else {
                        return blog
                    };
                });
                setBlogs( updateCurrentBlogCommentsShowPage );
                setUpdateFlag( true) ;
            } else {
                const errorsList = updatedComment.errors.map((error) => <>{ error }</>);
                setErrors( errorsList );
            };
        });
    };

  return (
        <div>
            <img className="userProfileAvatar" src={ comment.user_avatar } alt="avatar" width="50" height="50"/>
            <b>{ comment.username }</b> -

            <form onSubmit={ updateUserComment }>
                <input
                className='addCommentFormInput'
                type="text"
                value={ userUpdatedComment }

                onChange={(e) => {
                    if( e.target.value ){
                      setUserUpdatedComment( e.target.value );
                      setUpdateCommentPinkAlert( false );
                    } else {
                          setUserUpdatedComment( e.target.value );
                          setUpdateCommentPinkAlert( true );
                        };
                      }}
                autoFocus/>

                { updateCommentPinkAlert ?
                    <>
                        <button className='updateCommentFormInputButton' type='submit'> UPDATE </button>
                        <h3 className='sendCommentFormError'> {errors} </h3>
                    </>
                :
                    <button className='updateCommentFormInputButtonTwo' type='submit'> UPDATE </button>
                }
            </form>
            <button className="commentButtonTools" onClick={ () => deleteBlogComment(comment, currentBlog) }> remove </button>
        </div>
  );
};
