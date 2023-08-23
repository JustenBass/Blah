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
      <div className='navParent'>
        <div className='nav inline-block-child'>
          <img className='userAvatar' src={user.avatar} alt="avatar" height="100" width="100"/>
        </div>

        <div className='nav inline-block-child'>
          <h1>Hello, {user.username} </h1>
        </div>

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
