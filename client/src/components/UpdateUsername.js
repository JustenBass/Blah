import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function UpdateUsername({ setShowUpdateForm }) {
    const { user, setUser } = useContext(UserContext)
    const [username, setUsername] = useState('')

    function updateUsername(e){
        e.preventDefault()

        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' :'application/json'},
            body: JSON.stringify({
                username: username,
            })
        })
        .then((r) => r.json())
        .then((updatedUsername) => {

            if(user.username !== updatedUsername){

                const updateUsername = {
                    ...user,
                     username: updatedUsername
                }
                setUser(updateUsername)
            }
            setShowUpdateForm(true)
        })
    }

    return (
        <form onSubmit={updateUsername}>
            <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <button type="submit"> change username </button>
        </form>
      )


}
