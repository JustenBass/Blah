import React, { useState, useEffect } from "react";

//this gives me global state
const UserContext = React.createContext()

function UserProvider({ children }) {
    const [ isAuthenticated, setIsAuthenticated ] = useState( false )
    const [ user, setUser ] = useState( null )
    const [ userError, setUserError ] =useState( '' )
    const [ usernameErrors, setUsernameErrors ] = useState( '' )
    const [ showUpdateSuccessAlert, setShowUpdateSuccessAlert ] = useState( false )
    const [ showUpdateErrorAlert , setShowUpdateErrorAlert ] = useState ( false )
    const [ passwordErrors, setPasswordErrors ] = useState( '' );
    const [ blogs, setBlogs ] = useState( [] )
    const [ commentFormFlag, setCommentFormFlag ] = useState( true )
    const [ updateFlag, setUpdateFlag ] = useState( true )
    const [ commentErrors, setCommentErrors ] = useState( '' );
    const [ sendCommentPinkAlert, setSendCommentPinkAlert ] = useState( true );
    const [ updateCommentPinkAlert, setUpdateCommentPinkAlert ] = useState( true );

    console.log('user', user)



    const signup = (user) => {
        setUser( user )
        setIsAuthenticated( true)
    }


    const login = (user) => {
        setUser( user )
        setIsAuthenticated( true )
    }


    const logout = () => {
        setUser( null )
        setIsAuthenticated( false )
    }


    useEffect(() => {
        fetch('/profile')
        .then((r) => r.json())
        .then((data) => {
            setUser( data )
            if( data.error ){
                setIsAuthenticated( false );
                const errorList = data.error.map((error) => <>{ error }</>)
                setUserError( errorList );
            } else {
                setIsAuthenticated( true );
            }
        })
    }, [])


    const updateSuccessAlertTimeout = () => {
        setTimeout(() => {
            setShowUpdateSuccessAlert( false );
        }, 2000);
    };

    const updateErrorAlertTimeout = () => {
      setTimeout(() => {
          setShowUpdateErrorAlert( false );
      }, 4000);
  };

    function updateUsername(username){
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' :'application/json'},
            body: JSON.stringify( username )
        })
        .then((r) => r.json())
        .then((updatedUser) => {
            if( !updatedUser.errors ){
                setUser( updatedUser );
                setShowUpdateSuccessAlert( true );
                updateSuccessAlertTimeout();
                setUsernameErrors( '' );
            } else {
                const errorsList = updatedUser.errors.map((error) => <>{ error }</>)
                setUsernameErrors( errorsList );
                setShowUpdateErrorAlert( true );
                setShowUpdateSuccessAlert( null );
                updateErrorAlertTimeout();
            };
          });
        };



    function updatePassword(password){
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' :'application/json'},
            body: JSON.stringify( password )
    })
    .then((r) => r.json())
    .then((updatedPassword) => {
         if( !updatedPassword.errors ){
            setUser( updatedPassword );
            setShowUpdateSuccessAlert( true);
            updateSuccessAlertTimeout();
            setPasswordErrors( '' );
        } else {
            const errorsList = updatedPassword.errors.map((error) => <>{ error }</>);
            setPasswordErrors ( errorsList );
            setShowUpdateErrorAlert( true );
            setShowUpdateSuccessAlert(null);
            updateErrorAlertTimeout();
          };
        });
      };


    useEffect(() => {
        fetch('/blogs')
        .then((r) => r.json())
        .then((blogs) => {
            setBlogs( blogs )
        })
    }, []);


    const addComment = (comment) => {
        fetch('/comments',{
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify( comment )
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
            setCommentFormFlag( true );

            const findUserBlog = user.blogs.find((blog) => blog.id === newComment.blog_id);

            if( !findUserBlog ){
              const updateUserBlogs = [ ...user.blogs, newComment.blog ];
              const updatedUser = { ...user, blogs: updateUserBlogs };
              setUser( updatedUser );
             };

            } else {
            const errorsList = newComment.errors.map((error) => <>{ error }</>);
            setCommentErrors( errorsList );
            setCommentFormFlag( false );
          };
        });
      };



      const deleteBlogComment = (selectedComment, currentBlog) => {
        fetch(`/comments/${selectedComment.id}`,{
            method: 'DELETE',
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(() =>{
          const nonDeletedBlogComments = currentBlog.comments.filter((comment) => comment.id !== selectedComment.id);

          const updateBlogComments = blogs.map((blog) => {
            if( blog.id === currentBlog.id ){
              return {
                ...currentBlog,
                comments: nonDeletedBlogComments
              }
            } else {
              return blog
            };
          });
          setBlogs( updateBlogComments );

          const findUserComments = nonDeletedBlogComments.find((comment) => comment.user_id === user.id)

          if( !findUserComments ){
                const filterUserBlogs = user.blogs.filter((blog) => blog.id !== selectedComment.blog_id)
                const updateUser = { ...user, blogs: filterUserBlogs }
                setUser( updateUser );
              };
          });
          setIsAuthenticated( true )
    };



    return(
        <UserContext.Provider
        value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            userError,
            signup,
            login,
            logout,
            updateUsername,
            usernameErrors,
            showUpdateSuccessAlert,
            showUpdateErrorAlert,
            updatePassword,
            passwordErrors,
            blogs,
            setBlogs,
            commentFormFlag,
            updateFlag,
            setUpdateFlag,
            setCommentFormFlag,
            addComment,
            commentErrors,
            sendCommentPinkAlert,
            setSendCommentPinkAlert,
            updateCommentPinkAlert,
            setUpdateCommentPinkAlert,
            deleteBlogComment
            }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}