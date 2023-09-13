import React, { useState, useEffect } from "react";
//this gives me global state
const UserContext = React.createContext()

function UserProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [userError, setUserError] =useState('')
    const [blogs, setBlogs] = useState([])
    const [sendCommentAlert, setSendCommentAlert] = useState( true );
    const [updateCommentAlert, setUpdateCommentAlert] = useState( true );




useEffect(() => {
    fetch('/profile')
    .then((r) => r.json())
    .then((data) => {
        setUser(data)
        if(data.error){
            setIsAuthenticated(false)
            const errorList = data.error.map((error) => <>{error}</>)
            setUserError(errorList)
        }else{
            setIsAuthenticated(true)
        }
    })
}, [])



useEffect(() => {
    fetch('/blogs')
    .then((r) => r.json())
    .then((blogs) => {
        setBlogs(blogs)
    })
}, [])


const login = (user) => {
    setUser(user)
    setIsAuthenticated(true)
}

const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
}

const signup = (user) => {
    setUser(user)
    setIsAuthenticated(true)
}

const deleteBlogComment = (selectedComment, currentBlog) => {
    fetch(`/comments/${selectedComment.id}`,{
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json'}
    })
    .then(() =>{
      const nonDeletedBlogComments = currentBlog.comments.filter((comment) => comment.id !== selectedComment.id);

      const updateBlogComments = blogs.map((blog) => {
        if(blog.id === currentBlog.id){
          return {
            ...currentBlog,
            comments: nonDeletedBlogComments
          }
        } else {
          return blog
        }
      });
      setBlogs(updateBlogComments);

      const findUserComments = nonDeletedBlogComments.find((comment) => comment.user_id === user.id)

      if(!findUserComments){
            const filterUserBlogs = user.blogs.filter((blog) => blog.id !== selectedComment.blog_id)
            const updateUser = { ...user, blogs: filterUserBlogs}
            setUser(updateUser)
            }
      })
      setIsAuthenticated(true)
    }



    return(
        <UserContext.Provider value={{user, setUser, userError, blogs, setBlogs, deleteBlogComment, sendCommentAlert, setSendCommentAlert, updateCommentAlert, setUpdateCommentAlert, login, logout, signup, isAuthenticated, setIsAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}