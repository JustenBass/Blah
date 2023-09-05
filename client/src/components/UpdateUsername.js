import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

export default function UpdateUsername({ setShowUpdateForm }) {
    const { user, setUser } = useContext( UserContext )
    const [ username, setUsername ] = useState( user.username )
    const [ errors, setErrors ] = useState( ' ' )
    const [showPassword, setShowPassword ] = useState( true )

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
        .then((updatedUser) => {
            if(!updatedUser.errors){
                setUser(updatedUser)
                setShowUpdateForm(true)
            } else {
                const errorsList = updatedUser.errors.map((error) => <>{error}</>)
                setErrors(errorsList)
            }
        })
    }

    return (
        <div>
            <form onSubmit={updateUsername}>
                <input
                type={ showPassword ? 'password' : 'text'}
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit"> change username </button>
            </form>
            <button onClick={() => setShowPassword((show) => !show)}> 👁 show password</button>
            <ul>
                <h3>{errors}</h3>
            </ul>
        </div>
      )


}
