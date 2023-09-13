import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

export default function UpdatePasswordForm() {
    const { user, setUser, isAuthenticated, userError } = useContext( UserContext );
    const [ password, setPassword ] = useState( '' );
    const [ passwordConfirmation, setPasswordConfirmation ] = useState( '' );
    const [ errors, setErrors ] = useState( '' );
    const [ showPassword, setShowPassword ] = useState( true );
    const navigate = useNavigate()


    function updateUsername(e){
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' :'application/json'},
            body: JSON.stringify({
            password: password,
            password_confirmation: passwordConfirmation
        })
    })
    .then((r) => r.json())
    .then((updatedUser) => {
         if( !updatedUser.errors ){
            setUser(updatedUser);
            navigate('/settings');
        } else {
            const errorsList = updatedUser.errors.map((error) => <>{ error} </>);
            setErrors( errorsList );
        };
    });
};

    if( isAuthenticated ){
        return (
            <div className='updateFormDivs'>
                <br/>
                <h1> UPDATE PASSWORD </h1>
                <hr/>

                <form onSubmit={ updateUsername }>
                    <input
                    className='updatePasswordFormInputs'
                    type={ showPassword ? 'password' : 'text' }
                    id='username'
                    placeholder='new password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    />

                    <div>
                        <input
                        className='updatePasswordFormInputs'
                        type={ showPassword ? 'password' : 'text'}
                        id='username'
                        placeholder='confirm new password'
                        value={ passwordConfirmation }
                        onChange={ (e) => setPasswordConfirmation(e.target.value) }
                        />
                    </div>
                    <br/>

                    <button className='updateFormInputButtons' type="submit"> CHANGE PASSWORD </button>
                </form>

                <button className='updateFormInputButtons' onClick={ () => setShowPassword((show) => !show) }> { showPassword ? '👁' : '🕶' }</button>
                <button className='updateFormInputButtons' onClick={ () => navigate('/settings') }> BACK TO SETTINGS</button>

                <h3>{ errors }</h3>
                <br/>
            </div>
        );
    } else {
        return (
            <div className='userErrorDiv'>
                <h3 className='userErrorFont'>{ userError }</h3>
            </div>
        )
    }
};
