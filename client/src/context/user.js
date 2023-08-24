import React, { useState, useEffect } from "react";
//this gives me global state
const UserContext = React.createContext()

function UserProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState(null)
const [users, setUsers] = useState([])
const [blogs, setBlogs] = useState([])
const [comments, setComments] = useState([])
console.log(comments)

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

const addComment = (comment) => {
    fetch('/comments',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(comment)
    })
    .then((r) => r.json())
    .then((newComment) => {
        setComments([...comments, newComment])
    })
}

useEffect(() => {
    fetch('/users')
    .then((r) => r.json())
    .then((users) => setUsers(users))
}, [])

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
        <UserContext.Provider value={{user, users, blogs, comments, addComment, login, logout, signup, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}