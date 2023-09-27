import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Blogs from '../components/Blogs'


export default function Home() {
    const { isAuthenticated, blogs } = useContext(UserContext)

    const trendingBlogs = blogs.filter((blog) => blog.trending ? true  : null)
    const nonTrendingBlogs = blogs.filter((blog) => !blog.trending ?  true : null)

    if (isAuthenticated) {
        return (
            <div className='allBlogsDiv'>
                <center>
                    <h1 className='allBlogsTrendingHeader'>TRENDING...</h1>
                </center>

                <div className='allBlogsImageParentDiv'>
                    {trendingBlogs.map((blog) => (
                        <Blogs
                        key={blog.id}
                        blog={blog}
                        />
                    ))}
                </div>
                <br/>
                <hr/>

                <center>
                    <h1 className='allBlogsGetTheBlahHeader'>GET THE BLAH 💋</h1>
                </center>
                <br/>


                <div className='allBlogsImageParentDiv'>
                    {nonTrendingBlogs.map((blog) => (
                        <Blogs
                        key={blog.id}
                        blog={blog}
                        />
                    ))}
                </div>

            </div>
          )
        } else {
            return (
            <div className='homeLoginSignupBlogsDivParent'>
                <h1 className='homeLoginSignupBlogsHeader'>WELCOME TO BLAH 💋</h1>

                <center>
                    <div className='homeLoginSignupBlogsDivChild'>
                        {nonTrendingBlogs.map((blog) => (
                            <Blogs
                            key={blog.id}
                            blog={blog}
                            />
                        ))}
                    </div>
                </center>
                <br/>
            </div>
        )
    }
}
