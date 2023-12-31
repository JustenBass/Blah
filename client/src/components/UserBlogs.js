import React from 'react';
import { Link } from 'react-router-dom';

export default function UserBlogs({ blog }) {
  return (
    <div>
      <Link to={ `/blogs/${blog.id}` }>
        <div className='userProfileBlogImageDiv'>
           <img className='userProfileBlogImage' src={ blog.image } alt="blogImg" width="325" height="285"/>
          <div className='userProfileBlogImageFadedbox'>
            <div className='title text'>
              { blog.title }
            </div>
          </div>
        </div>
        <br/>
      </Link>
    </div>
  )
}
