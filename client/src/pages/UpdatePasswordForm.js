import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

export default function UpdatePasswordForm() {
    const { updatePassword, isAuthenticated, showUpdateSuccessAlert, showUpdateErrorAlert, passwordErrors, userError } = useContext( UserContext );
    const [ userPasswordData, setPasswordData ] = useState ({
        password: null,
        password_confirmation: null,
    })
    const [ showPassword, setShowPassword ] = useState( true );
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setPasswordData({
            ...userPasswordData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const update = { ...userPasswordData}
        updatePassword( update )
        setPasswordData({
            password: '',
            password_confirmation: ''
        })
    }

    if( isAuthenticated ){
        return (
            <div className='updateFormDivs'>
                <br/>
                <h1> UPDATE PASSWORD </h1>
                <hr/>

                <form onSubmit={ handleSubmit }>
                    <input
                    className='updatePasswordFormInputs'
                    type={ showPassword ? 'password' : 'text' }
                    name='password'
                    placeholder='new password'
                    value={ userPasswordData.password }
                    onChange={ handleChange }
                    />

                    <div>
                        <input
                        className='updatePasswordFormInputs'
                        type={ showPassword ? 'password' : 'text'}
                        name='password_confirmation'
                        placeholder='confirm new password'
                        value={ userPasswordData.password_confirmation}
                        onChange={ handleChange }
                        />
                    </div>
                    <br/>

                    { showUpdateSuccessAlert ? 'SUCCESS' : null }
                    { showUpdateErrorAlert ? passwordErrors : null }
                    <button className='updateFormInputButtons' type="submit"> CHANGE PASSWORD </button>
                </form>

                <div>
                    <button className='updateFormInputButtons' onClick={ () => setShowPassword((show) => !show) }> { showPassword ? '👁' : '🕶' }</button>
                    <button className='updateFormInputButtons' onClick={ () => navigate('/settings') }> BACK TO SETTINGS</button>
                </div>
                <br/>
            </div>
        );
    } else {
        return (
            <div className='userErrorDiv'>
                <h3 className='userErrorFont'>{ userError }</h3>
            </div>
        )
    };
};
