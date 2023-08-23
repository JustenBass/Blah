import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {login} = useContext(UserContext)
  const navigate = useNavigate()


  function handleSubmit(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
    .then((r) => r.json())
    .then((user) => {
      if(!user.error){
        login(user)
        navigate('/')
      } else {
        setUsername('')
        setPassword('')
        const errorList = user.error.map((error) => <li>{error}</li>)
        setError(errorList)
      }

    });
  }


  return (
      <>
         <form onSubmit={handleSubmit}>
            <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit"/>
          </form>
          <ul>
            <h3>{error}</h3>
          </ul>
      </>
  )
}

