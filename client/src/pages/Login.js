import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ error, setError ] = useState( '' )
  const { login } = useContext( UserContext )
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
        const errorList = user.error.map((error) => <>{ error }</>)
        setError( errorList )
      }

    });
  }


  return (
      <div className='loginFormParentDiv'>
        <h1 className='homeLoginSignupBlogsHeader'> BLAH 💋 </h1>
         <form onSubmit={ handleSubmit }>
          <div>
            <input
            className='loginFormInput'
            type="text"
            id="username"
            placeholder='username...'
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
            autoFocus/>
          </div>

            <input
              className='loginFormInput'
              type="password"
              id="password"
              placeholder='password...'
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />

          <div>
            <br/>
            <input
              className='loginFormInput'
              type="submit"
            />
          </div>
          </form>

          <h3 className='loginErrors'>{ error }</h3>
      </div>
    );
};

