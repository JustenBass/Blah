import React, { useState, useEffect } from "react";
//this gives me global state
const UserContext = React.createContext()

function UserProvider({ children }) {
const [user, setUser] = useState(null)
const [isAuthenticated, setIsAuthenticated] = useState(false)
console.log("user", user)

useEffect(() => {
    fetch('/me')
    .then((r) => r.json())
    .then((data) => {
        setUser(data)
        data.error ? setIsAuthenticated(false) : setIsAuthenticated(true)
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

    return(
        <UserContext.Provider value={{user, login, logout, signup, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}