import React from 'react'
import { Link } from 'react-router-dom'

export default function Blogs({blog}) {

  return (
    <div className='blogImageParentDiv'>
      <Link to={`/blogs/${blog.id}`}>
        <div className='blogImage'>
          <img src={blog.image} alt="blogImg" width="325" height="285"/>
          <div className='fadedbox'>
            <div className='title text'>
              {blog.title}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
