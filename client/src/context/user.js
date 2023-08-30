import React, { useState, useEffect } from "react";
//this gives me global state
const UserContext = React.createContext()

function UserProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [comments, setComments] = useState([])

useEffect(() => {
    fetch('/me')
    .then((r) => r.json())
    .then((data) => {
        setUser(data)
        if(data.error){
            setIsAuthenticated(false)
        }else{
            setIsAuthenticated(true)
            fetchComments()
        }
    })
}, [])

const fetchComments = () => {
    fetch('/comments')
    .then((r) => r.json())
    .then((comments) => {
        setComments(comments)
    })
}



useEffect(() => {
    fetch('/blogs')
    .then((r) => r.json())
    .then((blogs) => setBlogs(blogs))
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

    return(
        <UserContext.Provider value={{user, setUser, blogs, setBlogs, comments, setComments, login, logout, signup, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}