import React, { useContext} from 'react'
import { UserContext } from '../context/user'
import UserBlogs from '../components/UserBlogs'

export default function UserProfile() {
    const { user, isAuthenticated} = useContext(UserContext)

    const BlogsCommentedOnByUser = () => {
      if(isAuthenticated){
        // const removeBlogDuplicatesFromArray = user.blogs.map((blog) => [blog.id, blog])
        // const newUserBlogHash = new Map(removeBlogDuplicatesFromArray)
        // const blogHashValues = newUserBlogHash.values()
        // const blogValuesArray = [...blogHashValues]

        return user.blogs.map((blog) => (
          <UserBlogs
          key={blog.id}
          blog={blog}
          />
        ))

      } else {
       return null 
      }
    }





    if(isAuthenticated){
      return (
        <div className='userProfileParentDiv'>
        <center>
          <br/>
            <img className='userAvatar' src={user.avatar} alt="avatar" height="350" width="350"/>
            <h1>{user.username}</h1>
        </center>
        <br/>

        <div className='userProfileChildDiv'>
        {BlogsCommentedOnByUser()}
        </div>

        </div>
      )
    } else {
      return (
        null
      )
    }

    }

