import React, { useState, useEffect } from "react";
//this gives me global state
const UserContext = React.createContext()

function UserProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState(null)
const [users, setUsers] = useState([])
const [blogs, setBlogs] = useState([])
const [unauthorizedBlogs, setUnauthorizedBlogs] = useState([])

useEffect(() => {
    fetch('/me')
    .then((r) => r.json())
    .then((data) => {
        setUser(data)
        data.error ? setIsAuthenticated(false) : setIsAuthenticated(true)
    })
}, [])

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

useEffect(() => {
    fetch('/unauthorized_blogs')
    .then((r) => r.json())
    .then((ub) => setUnauthorizedBlogs(ub))
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
        <UserContext.Provider value={{user, users, blogs, unauthorizedBlogs, login, logout, signup, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}