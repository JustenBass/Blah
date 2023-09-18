import React, { useContext } from 'react'
import { UserContext } from '../context/user'

export default function UserError() {
    const { userError } = useContext(UserContext)
    
  return (
    <div className='userErrorDiv'>
        <h3 className='userErrorFont'>{ userError }</h3>
    </div>
  )
}
