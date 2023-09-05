import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import { NavLink, useNavigate, Link } from 'react-router-dom'

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
        <Link to={'/me'}>
          <img className='userAvatar' src={user.avatar} alt="avatar" height="100" width="100"/>
        </Link>
        </div>

        <div className='nav inline-block-child'>
          <h1>Hi, {user.username}! </h1>
        </div>

      <button className='navLogout' onClick={logoutUser}>Logout</button>
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
