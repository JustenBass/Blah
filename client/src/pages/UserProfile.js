import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import UserBlogs from '../components/UserBlogs'
import UpdateProfile from '../components/UpdateProfile';

export default function UserProfile() {
    const { user, isAuthenticated} = useContext(UserContext);
    const [showProfileUpdate, setShowProfileUpdate] = useState(true)


    const ProfileBlogs = () => {
      if(isAuthenticated){

        return user.blogs.map((blog) => (
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
          { showProfileUpdate ?
          <div className='userProfileParentDiv'>
            <img onClick={() => setShowProfileUpdate((show) => !show)} className='userAvatar' src={user.avatar} alt="avatar" height="350" width="350"/>
            <h1>{user.username}</h1>
          </div>
          :
          <div className='userProfileParentDiv'>
            <UpdateProfile/>
          </div>
          }
          <br/>

          <div className='userProfileChildDiv'>
            {ProfileBlogs().reverse()}
          </div>
        </div>
        )
    } else {
      return (
        null
      )
    };
};

