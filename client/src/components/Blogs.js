import React from 'react'

export default function Blogs({blog}) {
  return (
    <div style={{width: 100, display: "table-cell", borderspacing: 10}}>
      <div className='example'>
        <img src={blog.image} width="200" height="200"/>
        <div className='fadedbox'>
          <div className='title text'>
            {blog.title}
          </div>
        </div>
      </div>
    </div>
  )
}
