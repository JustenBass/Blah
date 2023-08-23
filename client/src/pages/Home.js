import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Blogs from '../components/Blogs'

export default function Home() {
    const { isAuthenticated, blogs, unauthorizedBlogs } = useContext(UserContext)

    const trendingBlogs = blogs.filter((blog) => blog.trending ? true  : null)
    const nonTrendingBlogs = blogs.filter((blog) => !blog.trending ?  true : null)

    if (isAuthenticated) {
        return (
            <div className='backgroundColor'>
                <center>
                <h1 className='appTrendingFonts'>TRENDING...</h1>
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
                <h1 className='appGossipFont'>GET THE ALL THE GOSSIP 💋</h1>
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
         return(
            <div>
                <center>
                    {unauthorizedBlogs.map((blog) => (
                        <Blogs
                        key={blog.id}
                        blog={blog}
                        />
                    ))}
                </center>
            </div>
         )
    }
}
