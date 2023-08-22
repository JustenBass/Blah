import React from 'react'

export default function Blogs({blog}) {
  return (
    <div style={{width: 100, display: "table-cell"}}>
        <h4>{blog.title}</h4>
        <img src={blog.image} width="200" height="200"/>
    </div>
  )
}
