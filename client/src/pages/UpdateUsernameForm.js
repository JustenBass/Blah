import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

export default function UpdateUsernameForm() {
    const { user, setUser, isAuthenticated, userError } = useContext( UserContext );
    const [ username, setUsername ] = useState( '' );
    const [ errors, setErrors ] = useState( ' ' );
    const [ showUsername, setShowUsername] = useState( true );
    const navigate = useNavigate()


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
            if( !updatedUser.errors ){
                setUser( updatedUser )
                navigate( '/settings' )
            } else {
                const errorsList = updatedUser.errors.map((error) => <>{ error }</>);
                setErrors( errorsList );
            };

        });
    };

    if(isAuthenticated){
        return (
        <div className='updateFormDivs'>
                    <br/>
                    <h1>UPDATE USERNAME</h1>
                    <hr/>
                    <form onSubmit={ updateUsername} >
                        <input
                        className='updateFormInputs'
                        type={ showUsername ? 'password' : 'text'}
                        id='username'
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                        />

                        <div>
                            <br/>
                            <button className='updateFormInputButtons' type="submit"> change username </button>
                        </div>
                    </form>

                    <button className='updateFormInputButtons' onClick={ () => setShowUsername((show) => !show) }> { showUsername ? '👁' : '🕶' }</button>
                    <button className='updateFormInputButtons' onClick={ () => navigate('/settings') }> BACK TO SETTINGS </button>
                    <h3>{ errors }</h3>
                    <br/>
            </div>
          );
    } else {
        return(
            <div className='userErrorDiv'>
                <h3 className='userErrorFont'>{ userError }</h3>
            </div>
        )
    }
};
