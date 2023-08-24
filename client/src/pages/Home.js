import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Blogs from '../components/Blogs'

export default function Home() {
    const { isAuthenticated, blogs} = useContext(UserContext)

    const trendingBlogs = blogs.filter((blog) => blog.trending ? true  : null)
    const nonTrendingBlogs = blogs.filter((blog) => !blog.trending ?  true : null)

    if (isAuthenticated) {
        return (
            <div className='allBlogsDiv'>

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
                <h1 className='appGossipFont'>GET THE BLAH 💋</h1>
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
         return(<h1>PLEASE LOGIN OR SIGN UP</h1>)
    }
}
