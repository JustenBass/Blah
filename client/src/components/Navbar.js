import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useContext( UserContext );
  const navigate = useNavigate();

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'}
    })
    .then(() => {
      logout();
      navigate('/');
    });
  };

  if( isAuthenticated ){
    return (
      <div className='navbarFlexParent'>
        <br/>
        <img className='userProfileAvatar' src={ user.avatar } alt="avatar" height="100" width="100"/>
        <h1>Hi, { user.username }! </h1>

        <NavLink to='/'>
          <button  className='navbarLinkButtons'> HOME </button>
        </NavLink>

        <NavLink to='/profile'>
          <button  className='navbarLinkButtons'> PROFILE </button>
        </NavLink>

        <NavLink to='/post_blog'>
          <button  className='navbarLinkButtons'> POST </button>
        </NavLink>

        <NavLink to='/settings'>
          <button  className='navbarLinkButtons'> SETTINGS </button>
        </NavLink>

        <NavLink to='/'>
          <button  className='navbarLinkButtons' onClick={ logoutUser }> LOGOUT </button>
        </NavLink>
      </div>
    )
  } else {
    return (
      <div>
        <NavLink to='/login'>
          <button className='loginSignupNavButtons'> Login </button>
        </NavLink>

        <NavLink to='/signup'>
          <button className='loginSignupNavButtons'> Signup </button>
        </NavLink>
        </div>
    );
  };
};
