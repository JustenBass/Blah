import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const {user, logout, isAuthenticated} = useContext(UserContext)
  const navigate = useNavigate()

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'}
    })
    .then(() => {
      logout()
      navigate('/')
    })
  }

  if(isAuthenticated){
    return (
      <div>
        <h1>Hello, {user.username} </h1>
        <br/>
        <button onClick={logoutUser}>Logout</button>
    </div>
    )
  } else {
    return (
      <div>
        <NavLink to='/login'>
          <button>Login</button>
        </NavLink>
        <NavLink to='/signup'>
          <button>Signup</button>
        </NavLink>
      </div>
    )
  }

  }
