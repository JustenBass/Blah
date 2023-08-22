import React from 'react'

export default function Blogs({blog}) {
  return (
    <div>
        <h4>{blog.title}</h4>
        <img src={blog.image} width="200" height="200"/>
    </div>
  )
}
