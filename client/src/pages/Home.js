import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Blogs from '../components/Blogs'

export default function Home() {
    const { isAuthenticated, blogs } = useContext(UserContext)

    const trendingBlogs = blogs.filter((blog) => blog.trending ? true : null)

    if (isAuthenticated) {
        return (
            <div>
                <h1>TRENDING NEWS...</h1>
                <br/>

                <center>
                <div className='blog-image-scroll'>
                    {trendingBlogs.map((blog) => (
                        <Blogs
                        key={blog.id}
                        blog={blog}
                        />
                    ))}
                </div>
                </center>

            </div>
          )
        } else {
         return(<h3>Please Login or Signup</h3>)
    }
}
