import React, { useContext } from 'react'
import { UserContext } from '../context/user'

export default function Home() {
    const { isAuthenticated } = useContext(UserContext)

    if (isAuthenticated) {
        return (
            <div>
                <h3>List of popular items will go here</h3>
            </div>
          )
        } else {
         return(<h3>Please Login or Signup</h3>)
    }
}
