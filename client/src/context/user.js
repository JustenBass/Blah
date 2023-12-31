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
    const [ blogErrors, setBlogErrors ] = useState( '' )
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
            if( data.error ){
                setIsAuthenticated( false );
                const errorList = data.error.map((error) => <>{ error }</>)
                setUserError( errorList );
            } else {
                setUser( data )
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

  const selectedBlog = (id) => {
    blogs.find(blog => blog.id == id)
  if(!selectedBlog){
      return <p>Loading...</p>
  }
  }

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

                const blogUsers = blogs.map((blog) => blog.users)

                const users = blogUsers.flatMap((user) => user)

                const findUser = users.filter((user) => user.id === updatedUser.id)

               const updateUser = users.map((user) => {
                if(user.id === updatedUser.id){
                  const update = {
                    ...user,
                    username: updatedUser.username
                  }
                  setUser(update)
                } else {
                  return user
                }
               })

                console.log('uname', updateUser)
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

    const addBlog = (blog) => {
      fetch('/blogs',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify( blog )
      })
      .then((r) => r.json())
      .then((newBlog) => {
        if( !newBlog.errors){
          setBlogs([...blogs, newBlog])
        } else {
          const errorsList = newBlog.errors.map((error) => <>{ error }</>)
          setBlogErrors(errorsList)
        }
      })
    }

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

            const findUserBlog = user.unique_blogs.find((blog) => blog.id === newComment.blog_id);

            if( !findUserBlog ){
              const updateUserBlogs = [ ...user.unique_blogs, newComment.blog ];
              const updatedUser = { ...user, unique_blogs: updateUserBlogs };
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
                const filterUserBlogs = user.unique_blogs.filter((blog) => blog.id !== selectedComment.blog_id)
                const updateUser = { ...user, unique_blogs: filterUserBlogs }
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
            addBlog,
            blogErrors,
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