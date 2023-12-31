import React from 'react';
import { Link } from 'react-router-dom';

export default function Blogs({ blog }) {

  return (
    <>
      <Link to={ `/blogs/${blog.id}` }>
        <div className='allBlogsImageChildDiv'>
          <img src={ blog.image } alt="blogImg" width="325" height="285"/>
          <div className='fadedbox'>
            <div className='title text'>
              { blog.title }
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
