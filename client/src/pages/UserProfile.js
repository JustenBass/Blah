import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import UserBlogs from '../components/UserBlogs'

export default function UserProfile() {
    const { user, isAuthenticated, userError} = useContext( UserContext );


    const profileBlogs = () => {
      if(isAuthenticated){
        const uniqueObjects = [...new Map(user.blogs.map(blog => [blog.id, blog])).values()]

        return uniqueObjects.map((blog) => (
          <UserBlogs
          key={blog.id}
          blog={blog}
          />
        ))
      } else {
       return null
      };
    };

    if(isAuthenticated){
      return (
        <div className='userProfileParentDiv'>
          <br/>
          <h1>{user.username}</h1>
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

