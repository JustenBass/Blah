import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import UserBlogs from '../components/UserBlogs'

export default function UserProfile() {
    const { user, isAuthenticated, userError} = useContext( UserContext );

    const profileBlogs = () => {

        return user.unique_blogs.map((blog) => (
          <UserBlogs
          key={blog.id}
          blog={blog}
          />
        ))
    };

    if(isAuthenticated){
      return (
        <div className='userProfileParentDiv'>
          <br/>
          <h1>{user.username.toUpperCase()}</h1>
          <img className='userProfileAvatar' src={user.avatar} alt="avatar" height="350" width="350"/>
          <h1 className='appGossipFont'>ARTICLES YOU'VE LEFT YOUR BLAHS ON...</h1>
          <br/>

          <div className='userProfileBlogsChildDiv'>
            {profileBlogs().reverse()}
            <br/>
          </div>
        </div>
        )
    } else {
      return (
        <div className='userErrorDiv'>
          <h3 className='userErrorFont'>{ userError }</h3>
        </div>
      )
    };
};

