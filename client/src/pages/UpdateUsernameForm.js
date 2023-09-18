import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

export default function UpdateUsernameForm() {
    const { updateUsername, isAuthenticated, showUpdateSuccessAlert, showUpdateErrorAlert, usernameErrors, userError } = useContext( UserContext );
    const [ usernameData, setUsernameData ] = useState( {
        username: ''
    })
    const [ showUsername, setShowUsername] = useState( true );
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUsernameData({
            ...usernameData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const update = { ...usernameData }
        updateUsername( update )
        setUsernameData({ username: '' })
    }

    if(isAuthenticated){
        return (
        <div className='updateFormDivs'>
                    <br/>
                    <h1>UPDATE USERNAME</h1>
                    <hr/>
                    <form onSubmit={ handleSubmit } >
                        <input
                        className='updateFormInputs'
                        type={ showUsername ? 'password' : 'text'}
                        // id='username'
                        name='username'
                        placeholder='new username...'
                        value={ usernameData.username }
                        onChange={ handleChange }
                        />

                        <div>
                            { showUpdateSuccessAlert ? 'SUCCESS' : null }
                            { showUpdateErrorAlert ? usernameErrors : null }
                            <br/>
                            <button className='updateFormInputButtons' type="submit"> change username </button>
                        </div>
                    </form>

                    <div>
                        <button className='updateFormInputButtons' onClick={ () => setShowUsername((show) => !show) }> { showUsername ? '👁' : '🕶' }</button>
                        <button className='updateFormInputButtons' onClick={ () => navigate('/settings') }> BACK TO SETTINGS </button>
                    </div>
                    <br/>
            </div>
          );
    } else {
        return(
            <div className='userErrorDiv'>
                <h3 className='userErrorFont'>{ userError }</h3>
            </div>
        )
    };
};
