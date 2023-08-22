import React from 'react'

export default function BlogComments({user}) {

    console.log("Current User", user)
  return (
    <div>
        {user.username}
    </div>
  )
}
