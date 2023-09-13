import React, {useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
  const [ username, setUsername ] = useState( '' )
  const [ avatar, setAvatar ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ passwordConfirmation, setPasswordConfirmation ] = useState( '' )
  const [ errorsList, setErrorsList ] = useState( [] )
  const { signup } = useContext( UserContext )
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/signup', {
      //this is a configuration object
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        username: username,
        avatar: avatar,
        password: password,
        password_confirmation: passwordConfirmation
      })
    })
    .then((r) => r.json())
    .then((user) => {
      if(!user.errors) {
        signup( user )
        navigate( '/' )
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
    <div className='signupFormParentDiv'>
      <h1 className='homeLoginSignupBlogsHeader'> BLAH 💋</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <input
            className='signupFormInput'
            type="text"
            id="username"
            placeholder='username...'
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
            autoFocus/>
        </div>

        <input
          className='signupFormInput'
          type="text"
          id="avatar"
          placeholder='avatar url...'
          value={ avatar }
          onChange={ (e) => setAvatar(e.target.value) }
        />

        <div>
          <input
            className='signupFormInput'
            type="password"
            id="password"
            placeholder='password...'
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <input
          className='signupFormInput'
          type="password"
          id="password_confirmation"
          placeholder='confirm password...'
          value={ passwordConfirmation }
          onChange={ (e) => setPasswordConfirmation(e.target.value) }
        />

        <div>
          <br/>
          <input
          className='signupFormInput'
          type="submit"/>
        </div>
      </form>

        <h1 className='signupErrors'>{ errorsList }</h1>
    </div>
  );
};
