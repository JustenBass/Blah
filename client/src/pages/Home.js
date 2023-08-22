import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Blogs from '../components/Blogs'

export default function Home() {
    const { isAuthenticated, blogs } = useContext(UserContext)

    const trendingBlogs = blogs.filter((blog) => blog.trending ? true  : null)
    console.log("trending", trendingBlogs)
    const nonTrendingBlogs = blogs.filter((blog) => !blog.trending ?  true : null)

    if (isAuthenticated) {
        return (
            <div>
                <center>
                <h1>TRENDING...</h1>
                </center>
                <br/>

                <center>
                {trendingBlogs.map((blog) => (
                        <Blogs
                        key={blog.id}
                        blog={blog}
                        />
                    ))}
                </center>
                <br/>
                <hr/>

                <center>
                <h1>GET THE ALL THE GOSSIP 💋</h1>
                </center>
                <br/>

                <center>
                    {nonTrendingBlogs.map((blog) => (
                        <Blogs
                        key={blog.id}
                        blog={blog}
                        />
                    ))}
                </center>
            </div>
          )
        } else {
         return(<h3>Please Login or Signup</h3>)
    }
}
