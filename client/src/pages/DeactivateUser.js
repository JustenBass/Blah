import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom';

function DeactivateUser() {
  const { user, isAuthenticated, setIsAuthenticated, userError } = useContext(UserContext)
  const navigate = useNavigate()




  const deactivateUser = (userObject) => {
    fetch(`/users/${userObject}`,{
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json'}
    })
    .then(() =>{
      setIsAuthenticated(false)
      navigate('/')
    })
    }

    if( isAuthenticated ){
      return (
        <div className='updateFormDivs'>
          <br/>
          <h1>CLICK BELOW TO CONFIRM ACCOUNT DEACTIVATION</h1>
          <div>
            <button className='updateFormInputButtons' onClick={() => deactivateUser(user.id)}> DEACTIVATE </button>
          </div>
          <br/>
        </div>
      )
    } else {
      return (
        <div className='userErrorDiv'>
          <h3 className='userErrorFont'>{ userError }</h3>
        </div>
      )
    };
};

export default DeactivateUser