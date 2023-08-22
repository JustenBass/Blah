import React, {useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorsList, setErrorsList] = useState([])
  const {signup} = useContext(UserContext)
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/signup', {
      //this is a configuration object
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      })
    })
    .then((r) => r.json())
    .then((user) => {
      if(!user.errors) {
        signup(user)
        navigate('/')
      } else {
        setUsername('')
        setPassword('')
        setPasswordConfirmation('')
        const errorList = user.errors.map((error) => <li>{error}</li>)
        setErrorsList(errorList)
      }
    })
  }

  return (
    <div>
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

        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <input type="submit"/>
      </form>
      <ul>
        {errorsList}
      </ul>
    </div>
  )
}
